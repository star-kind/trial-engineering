var writeInfo = require("../../utils/write_info");
var deleteArticleService = require("../../models/services/journals/delete_blog_service");
const tokenUtils = require("./../../utils/token_utils");
const Responses = require("./../../json/Responses");

async function deleteArticleController(req, res, next) {
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
    let articleIdArray = req.body.article_id_array;

    console.log("articleIdArray", articleIdArray);
    if (!articleIdArray || articleIdArray.length == 0) {
      res.send(Responses.not_select_any_article);
      return;
    }

    let array = [];
    for (let index = 0; index < articleIdArray.length; index++) {
      let respRes = await deleteArticleService(
        uid,
        email,
        Number(articleIdArray[index])
      );
      array.push(respRes);
    }

    res.send(array);
  }
}

module.exports = deleteArticleController;
