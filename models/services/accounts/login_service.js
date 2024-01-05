const getAccountByMail = require("../../databases/account/select_accout_by_mail");
const Responses = require("../../../json/Responses");
const cipherUtils = require("../../../utils/cipher_utils");
const tokenUtils = require("../../../utils/token_utils");
const PublicVariable = require("../../../config/public_variable");

async function loginingService(userEmail, password) {
  // 如果参数任意一个为空，return错误信息
  if (!userEmail || !password) {
    return Responses.param_empty;
  }

  // 如果参数任意一个包含空格，return错误信息
  if (userEmail.includes(" ") || password.includes(" ")) {
    return Responses.contains_spaces;
  }

  // 如果参数：email 不符合：正则表达式(邮箱地址),return错误信息
  if (!PublicVariable.EmailRegex.test(userEmail)) {
    return Responses.invalid_email;
  }

  // 如果参数 password 的长度小于或者大于,return错误信息
  let upperLimit = PublicVariable.PassWordUpperLimit;
  let lowerLimit = PublicVariable.PassWordLowerLimit;
  if (password.length < lowerLimit || password.length > upperLimit) {
    return Responses.password_length_wrong;
  }

  // 检查user的存在与否
  var checkExist = await checkEexistence(userEmail);
  if (checkExist.flag === false) {
    return Responses.no_such_user;
  }

  // 判断密码对错
  var kwdSign = VerifyPasswordCorrectness(password, checkExist.data);
  if (kwdSign === false) {
    return Responses.password_incorrect;
  }

  //生成token
  let tokenStr = tokenUtils.generateToken(checkExist.data.id, userEmail);
  let mergedResult = Object.assign({}, Responses.success, {
    token: tokenStr,
    userEmailAddress: userEmail,
  });
  return mergedResult;
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

async function checkEexistence(mail) {
  try {
    const account = await getAccountByMail(mail);
    if (account === undefined) {
      console.log(__filename, "The account not exists");
      return { flag: false, data: null };
    } else {
      console.log("Exists True", account);
      return { flag: true, data: account };
    }
  } catch (err) {
    console.error("error", err);
  } finally {
    console.error(__filename, "check Eexistence-finally");
  }
}

async function test(mail, passowrd) {
  try {
    let result = await loginingService(mail, passowrd);
    console.log("result", result);
  } catch (error) {
    console.error(error);
  }
}
// test("Account@sln.com", "98790");
module.exports = loginingService;
