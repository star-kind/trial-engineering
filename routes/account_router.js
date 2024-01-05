var express = require("express");
var router = express.Router();
var registerController = require("../controllers/accounts/register_controller");
var loginingController = require("../controllers/accounts/login_controller");
var renewalMailController = require("../controllers/accounts/renewal_mail_controller");
var alterPasswordController = require("../controllers/accounts/alter_password_controller");

router.get("/", function (req, res, next) {
  res.render("account/logining");
});

router.post("/account-logining", loginingController);

router.get("/account-register-component", function (req, res, next) {
  res.render("account/register");
});

router.post("/account-register-new-account", registerController);

router.get("/account-renewal-email", function (req, res, next) {
  res.render("account/modify-email");
});

router.post("/account-renewal-email-action", renewalMailController);

router.get("/account-amend-password", function (req, res, next) {
  res.render("account/emendation-password");
});

router.post("/account-amend-password-action", alterPasswordController);

module.exports = router;
