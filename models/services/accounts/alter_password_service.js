const getAccountByMail = require("../../databases/account/select_accout_by_mail");
const Responses = require("../../../json/Responses");
const cipherUtils = require("../../../utils/cipher_utils");
const updateAccounts = require("./../../databases/account/update_account_by_mail");

async function alterPasswordService(
  previousPassword,
  newPassword,
  repeatNewPassword,
  userEmail
) {
  if (newPassword !== repeatNewPassword) {
    return Responses.pwd_inconsistent;
  }

  if (
    previousPassword === repeatNewPassword ||
    previousPassword === newPassword
  ) {
    return Responses.password_conflict;
  }

  if (!userEmail) {
    return Responses.user_status_amiss; // 如果user Email为空
  }

  // 如果3个参数任意一个为空，return错误信息
  if (!previousPassword || !newPassword || !repeatNewPassword) {
    return Responses.param_empty;
  }

  // 如果3个参数任意一个包含空格，return错误信息
  if (
    previousPassword.includes(" ") ||
    newPassword.includes(" ") ||
    repeatNewPassword.includes(" ")
  ) {
    return Responses.contains_spaces;
  }

  // 如果参数 password 的长度小于或者大于,return错误信息
  let upperLimit = PublicVariable.PassWordUpperLimit;
  let lowerLimit = PublicVariable.PassWordLowerLimit;
  if (
    previousPassword.length < lowerLimit ||
    previousPassword.length > upperLimit ||
    newPassword.length < lowerLimit ||
    newPassword.length > upperLimit ||
    repeatNewPassword.length < lowerLimit ||
    repeatNewPassword.length > upperLimit
  ) {
    return Responses.password_length_wrong;
  }

  // 检查user的存在与否
  let checkExist = await checkUserEexistence(userEmail);
  if (checkExist.flag === false) {
    return Responses.no_such_user;
  }

  // 判断密码对错
  let kwdSign = VerifyPasswordCorrectness(previousPassword, checkExist.data);
  if (kwdSign === false) {
    return Responses.origin_password_incorrect;
  }

  // 重新生成密文
  let newCipherText = cipherUtils.getCipherText(
    repeatNewPassword,
    checkExist.data.salt,
    checkExist.data.initvector
  );

  await updateAccounts.updateAccountPasswordByMail(newCipherText, userEmail);
  return Responses.success;
}

async function checkUserEexistence(mail) {
  try {
    const account = await getAccountByMail(mail);
    if (account === undefined) {
      console.log(__filename, "The account not exists");
      return { flag: false, data: null };
    } else {
      console.log("check UserEexistence Exists True", account);
      return { flag: true, data: account };
    }
  } catch (err) {
    console.error("error", err);
  } finally {
    console.error(__filename, "check UserEexistence-finally");
  }
}

function VerifyPasswordCorrectness(submitPassword, account) {
  console.log("account:", account);
  var flag = cipherUtils.verifyCoincide(
    submitPassword,
    account.salt,
    account.initvector,
    account.password
  );
  return flag;
}

async function test(
  previousPassword,
  newPassword,
  repeatNewPassword,
  userEmail
) {
  try {
    let result = alterPasswordService(
      previousPassword,
      newPassword,
      repeatNewPassword,
      userEmail
    );
    console.log(typeof result);
    let row = await result;
    console.log("result", row);
  } catch (error) {
    console.error(error);
  }
}
// test("9879", "98790", "98790", "Account@sln.com");
module.exports = alterPasswordService;
