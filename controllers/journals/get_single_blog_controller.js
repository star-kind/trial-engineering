var writeInfo = require("../../utils/write_info");
var getSingleArticleService = require("../../models/services/journals/get_single_article");
const tokenUtils = require("./../../utils/token_utils");
const Responses = require("./../../json/Responses");

async function getSingleBlogController(req, res, next) {
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
    let articleId = req.body.article_id;

    if (!articleId) {
      res.send(Responses.article_not_exists);
    }

    let respRes = await getSingleArticleService(uid, email, articleId);
    res.send(respRes);
  }
}

module.exports = getSingleBlogController;
