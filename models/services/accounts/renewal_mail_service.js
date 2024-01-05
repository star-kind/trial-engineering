const getAccountByMail = require("../../databases/account/select_accout_by_mail");
const Responses = require("../../../json/Responses");
const cipherUtils = require("../../../utils/cipher_utils");
const updateAccounts = require("./../../databases/account/update_account_by_mail");
const tokenUtils = require("../../../utils/token_utils");
const PublicVariable = require("../../../config/public_variable");

async function renewalMailService(originMail, newMail, password) {
  if (originMail === newMail) {
    return Responses.consistent_email;
  }

  // 如果3个参数任意一个为空，return错误信息
  if (!originMail || !newMail || !password) {
    return Responses.param_empty;
  }

  // 如果3个参数任意一个包含空格，return错误信息
  if (
    originMail.includes(" ") ||
    newMail.includes(" ") ||
    password.includes(" ")
  ) {
    return Responses.contains_spaces;
  }

  // 如果参数:新邮箱不符合：正则表达式(邮箱地址),return错误信息
  if (!PublicVariable.EmailRegex.test(newMail)) {
    return Responses.invalid_email;
  }

  // 如果参数:原邮箱不符合：正则表达式(邮箱地址),return错误信息
  if (!PublicVariable.EmailRegex.test(originMail)) {
    return Responses.user_status_amiss;
  }

  // 如果参数 password 的长度小于或者大于,return错误信息
  let upperLimit = PublicVariable.PassWordUpperLimit;
  let lowerLimit = PublicVariable.PassWordLowerLimit;
  if (password.length < lowerLimit || password.length > upperLimit) {
    return Responses.password_length_wrong;
  }

  // 检查user的存在与否
  let checkExist = await checkUserEexistence(originMail);
  if (checkExist.flag === false) {
    return Responses.no_such_user;
  }

  // 判断密码对错
  let kwdSign = VerifyPasswordCorrectness(password, checkExist.data);
  if (kwdSign === false) {
    return Responses.password_incorrect;
  }

  await updateAccounts.updateAccountEmailByMail(newMail, originMail);

  //生成token
  let tokenStr = tokenUtils.generateToken(checkExist.data.id, newMail);
  let mergedResult = Object.assign({}, Responses.success, {
    token: tokenStr,
    userEmailAddress: newMail,
  });
  return mergedResult;
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

async function test(originMail, newMail, password) {
  try {
    let result = await renewalMailService(originMail, newMail, password);
    console.log(typeof result, result);
  } catch (error) {
    console.error(error);
  }
}
// test("Account@sln.com", "NewGRMail@oti.com", "98790");
module.exports = { checkUserEexistence, renewalMailService };
