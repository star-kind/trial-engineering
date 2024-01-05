var writeInfo = require("../../utils/write_info");
var renewalMails = require("../../models/services/accounts/renewal_mail_service");
const tokenUtils = require("./../../utils/token_utils");
const Responses = require("./../../json/Responses");

async function renewalMailController(req, res, next) {
  console.log("renewal MailController.body", req.body);
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

    let originMail = parseResult.email;
    let newEmail = req.body.new_email;
    let password = req.body.password;

    let respResult = await renewalMails.renewalMailService(
      originMail,
      newEmail,
      password
    );
    res.send(respResult);
  }
}

module.exports = renewalMailController;
