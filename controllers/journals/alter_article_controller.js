var writeInfo = require("../../utils/write_info");
var alterationArticleService = require("../../models/services/journals/alteration_blog_service");
const tokenUtils = require("./../../utils/token_utils");
const Responses = require("./../../json/Responses");

async function alterArticleController(req, res, next) {
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
    let articleContent = req.body.article_content;
    let articleTitle = req.body.article_title;

    let respRes = await alterationArticleService(
      uid,
      email,
      articleId,
      articleTitle,
      articleContent
    );
    res.send(respRes);
  }
}

module.exports = alterArticleController;
