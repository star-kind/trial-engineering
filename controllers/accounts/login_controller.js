var writeInfo = require("../../utils/write_info");
var loginingService = require("./../../models/services/accounts/login_service");

async function loginingController(req, res, next) {
  console.log("logining Controller.body", req.body);
  writeInfo(req.body);

  var mail = req.body.email;
  var password = req.body.password;

  var result = await loginingService(mail, password);
  res.send(result);
}

module.exports = loginingController;
