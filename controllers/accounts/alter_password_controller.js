var writeInfo = require("../../utils/write_info");
var alterPasswordService = require("../../models/services/accounts/alter_password_service");
const tokenUtils = require("./../../utils/token_utils");
const Responses = require("./../../json/Responses");

async function alterPasswordController(req, res, next) {
  console.log("alter PasswordController.body", req.body);
  writeInfo({ header: req.headers, body: req.body });
  console.log("\ntoken:", req.headers.authorization);

  let tokenStr = req.headers.authorization.replace(/^Bearer\s*/, "");
  let expireFlag = tokenUtils.isTokenValid(tokenStr);
  console.log("expire Flag: ", expireFlag);

  if (expireFlag == false) {
    res.send(Responses.user_status_amiss);
  } else {
    let parseResult = tokenUtils.parseToken(tokenStr);
    console.log("parse Result: ", parseResult);

    let accountMail = parseResult.email;
    let previousPassword = req.body.previous_password;
    let newPassword = req.body.new_password;
    let repeatNewPassword = req.body.repeat_new_password;

    let respResult = await alterPasswordService(
      previousPassword,
      newPassword,
      repeatNewPassword,
      accountMail
    );
    res.send(respResult);
  }
}

module.exports = alterPasswordController;
