const getAccountByMail = require("../../databases/account/select_accout_by_mail");
const insertAccount = require("../../databases/account/inserts_account_data");
const Account = require("../../../json/Account");
const Responses = require("../../../json/Responses");
const cipherUtils = require("../../../utils/cipher_utils");
const PublicVariable = require("../../../config/public_variable");

async function registerService(email, firstPassword, secondPassword) {
  // 如果3个参数：email, firstPassword, secondPassword任意一个为空，return错误信息
  if (!email || !firstPassword || !secondPassword) {
    return Responses.param_empty;
  }

  // 如果3个参数：email, firstPassword, secondPassword任意一个包含空格，return错误信息
  if (
    email.includes(" ") ||
    firstPassword.includes(" ") ||
    secondPassword.includes(" ")
  ) {
    return Responses.contains_spaces;
  }

  // 如果参数：email 不符合：正则表达式(邮箱地址),return错误信息
  if (!PublicVariable.EmailRegex.test(email)) {
    return Responses.invalid_email;
  }

  // 如果参数：firstPassword, secondPassword 二者不匹配，return错误信息
  if (firstPassword !== secondPassword) {
    return Responses.pwd_inconsistent;
  }

  // 如果参数：firstPassword 的长度小于或者大于,return错误信息
  let upperLimit = PublicVariable.PassWordUpperLimit;
  let lowerLimit = PublicVariable.PassWordLowerLimit;
  if (firstPassword.length < lowerLimit || firstPassword.length > upperLimit) {
    return Responses.password_length_wrong;
  }

  // 如果参数：secondPassword 的长度小于或者大于,return错误信息
  if (
    secondPassword.length < lowerLimit ||
    secondPassword.length > upperLimit
  ) {
    return Responses.password_length_wrong;
  }

  let checkConstFlag = await checkConstant(email);
  console.info("checkConstFlag", checkConstFlag);
  if (checkConstFlag === false) {
    return Responses.already_registered;
  }

  return createdAccount(firstPassword, email);
}

async function checkConstant(mail) {
  let account = await getAccountByMail(mail);
  if (!account) {
    console.log("Can be assign a new Account,Cause it does not exists");
    return true;
  } else {
    console.log("Already Registered Account:", account);
    return false;
  }
}

async function createdAccount(password, email) {
  let userObject = new Account();
  userObject.email = email;
  userObject.initvector = cipherUtils.getSalt();
  userObject.salt = cipherUtils.getSalt();

  userObject.password = cipherUtils.getCipherText(
    password,
    userObject.salt,
    userObject.initvector
  );

  await insertAccount(userObject);
  return Responses.success;
}

async function test() {
  try {
    let resp = await registerService("Account@sln.com", "9879", "9879");
    console.log("response.type ==", typeof resp);
    if (typeof resp === "object") {
      console.log("response is object", resp);
    } else if (typeof resp === "promise") {
      let result = await resp;
      console.log("response is promise", result);
    }
  } catch (error) {
    console.error(error);
  }
}
// test();

module.exports = registerService;
