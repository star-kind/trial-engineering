var writeInfo = require("../../utils/write_info");
var registerRecive = require("../.././models/services/accounts/register_service");

async function registerController(req, res, next) {
  console.log("register Controller.body", req.body);
  writeInfo(req.body);

  var mail = req.body.user_email;
  var password = req.body.password;
  var repeat_password = req.body.repeat_password;

  var result = await registerRecive(mail, password, repeat_password);
  res.send(result);
}

module.exports = registerController;
