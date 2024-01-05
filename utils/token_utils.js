const jwt = require("jsonwebtoken");
const PublicVariable = require("../config/public_variable");

// 生成token的函数
function generateToken(userId, userEmail) {
  const payload = {
    userId: userId,
    email: userEmail,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * PublicVariable.ExpireHour, //有效期
  };

  const secretKey = PublicVariable.TokenSecretKey; // 请替换为你自己的密钥
  const token = jwt.sign(payload, secretKey);
  console.log("generateToken: ", token);

  return token;
}

// 解析token的函数
function parseToken(token) {
  const secretKey = PublicVariable.TokenSecretKey; // 请替换为你自己的密钥

  try {
    const decoded = jwt.verify(token, secretKey);
    console.info("parseToken: ", decoded);
    return decoded;
  } catch (error) {
    console.error("解析token出错：", error);
    return null;
  }
}

function isTokenValid(token) {
  const secretKey = PublicVariable.TokenSecretKey; // 请替换为你自己的密钥

  try {
    const decoded = jwt.verify(token, secretKey);
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decoded.exp;

    if (currentTime > expirationTime) {
      console.log("Lose efficacy token");
      return false;
    } else {
      console.log("Effective Token");
      return true;
    }
  } catch (error) {
    console.error("解析token出错：", error);
    return false;
  }
}

// var token = generateToken(2, "fot@hex.com");
// parseToken(token);
// isTokenValid(token);
module.exports = {
  generateToken,
  parseToken,
  isTokenValid,
};
