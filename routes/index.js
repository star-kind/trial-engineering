var express = require("express");
var router = express.Router();

router.get("/links-router", function (req, res, next) {
  res.render("links");
});

module.exports = router;
