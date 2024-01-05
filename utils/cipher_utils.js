const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

function getSalt() {
  // 获取UUID
  const uniqueId = uuidv4();

  // 进行md5加密
  const md5 = crypto.createHash("md5");
  const encryptedString = md5.update(uniqueId).digest("hex");

  // 去除横杆和截取字符串的0-16位字符
  const encryptStr = encryptedString.replace(/-/g, "").substring(0, 16);
  console.log("Encrypt Str: ", encryptStr);
  return encryptStr;
}

/**
 * 加密
 * @param {*} word
 * @param {*} key
 * @param {*} iv
 * @returns
 */
function aesEncrypt(word, key, iv) {
  iv = iv || "";
  var clearEncoding = "utf8";
  var cipherEnCoding = "base64";
  var cipherChunk = [];
  var cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  cipher.setAutoPadding(true);
  cipherChunk.push(cipher.update(word, clearEncoding, cipherEnCoding));
  cipherChunk.push(cipher.final(cipherEnCoding));
  return cipherChunk.join("");
}

/**
 * 解密(其实同为加密)
 * @param {*} word
 * @param {*} key
 * @param {*} iv
 * @returns
 */
function desEncrypt(word, key, iv) {
  iv = iv || "";
  var clearEncoding = "utf8";
  var cipherEnCoding = "base64";
  var cipherChunk = [];
  var decipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  decipher.setAutoPadding(true);
  cipherChunk.push(decipher.update(word, clearEncoding, cipherEnCoding));
  cipherChunk.push(decipher.final(cipherEnCoding));
  return cipherChunk.join("");
}

/**
 * 根据密码明文获取生成的密文
 * @param {*} password
 * @param {*} saltKey
 * @param {*} iv
 * @returns
 */
function getCipherText(password, saltKey, iv) {
  console.log("salt: ", saltKey, "  iv: ", iv);

  var cipherText = aesEncrypt(password, saltKey, iv);
  console.log(
    __filename + " cipherText= ",
    cipherText,
    " .length= ",
    cipherText.length
  );
  return cipherText;
}

/**
 * 校验提交的密码与数据表中的密文是否一致
 * @param {*} submitPassword
 * @param {*} dbSalt
 * @param {*} dbIV
 * @param {*} dbCipherText
 * @returns
 */
function verifyCoincide(submitPassword, dbSalt, dbIV, dbCipherText) {
  var submitDesCipher = desEncrypt(submitPassword, dbSalt, dbIV);
  console.log(
    __filename + " submitDesCipher= ",
    submitDesCipher,
    " .length= ",
    submitDesCipher.length
  );

  if (submitDesCipher === dbCipherText) {
    console.log("SubmitPassword is correct");
    return true;
  }
  console.log("SubmitPassword is mistaken");
  return false;
}

// function test(cipherText) {
//   var saltKey = getSalt();
//   var iv = getSalt();
//   var word = "987987987";
//   console.log("salt: ", saltKey, "  iv: ", iv);

//   var cipherText = aesEncrypt(word, saltKey, iv);
//   console.log("cipherText= ", cipherText, " .length= ", cipherText.length);

//   var desCipher = desEncrypt(word, saltKey, iv);
//   console.log("desCipher= ", desCipher, " .length= ", desCipher.length);
// }
// test();

module.exports = {
  getSalt,
  aesEncrypt,
  desEncrypt,
  getCipherText,
  verifyCoincide,
};
