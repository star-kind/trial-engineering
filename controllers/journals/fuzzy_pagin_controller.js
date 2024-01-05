var writeInfo = require("../../utils/write_info");
var fuzzyTitlePaginationService = require("../../models/services/journals/fuzzy_title_pagination_service");
const tokenUtils = require("./../../utils/token_utils");
const Responses = require("./../../json/Responses");

async function fuzzyPaginController(req, res, next) {
  console.log("blog List Controller body", req.body);
  writeInfo({ header: req.headers, blogListController: req.body });
  console.log("\ntoken:", req.headers.authorization);

  let tokenStr = req.headers.authorization.replace(/^Bearer\s*/, "");
  let expireFlag = tokenUtils.isTokenValid(tokenStr);
  console.log("expire Flag: ", expireFlag);

  if (expireFlag == false) {
    res.send(Responses.user_status_amiss);
  } else {
    let parseResult = tokenUtils.parseToken(tokenStr);
    console.log("parse Result: ", parseResult);

    let email = parseResult.email;
    let uid = parseResult.userId;
    let pageOrder = req.body.order;
    let title = req.body.article_title;

    if (!pageOrder || pageOrder < 0) {
      pageOrder = 1;
    }

    let respRes = await fuzzyTitlePaginationService(
      uid,
      email,
      pageOrder,
      title
    );

    res.send(respRes);
  }
}

module.exports = fuzzyPaginController;
