var writeInfo = require("../../utils/write_info");
var queryPaginationService = require("../../models/services/journals/get_blog_pagination_service");
const tokenUtils = require("./../../utils/token_utils");
const Responses = require("./../../json/Responses");

async function navigationPaginController(req, res, next) {
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

    if (!pageOrder) {
      res.send(Responses.no_this_page);
      return;
    } else if (pageOrder < 0) {
      res.send(Responses.no_previous_page); // 没有上一页
      return;
    }

    let respRes = await queryPaginationService(uid, email, pageOrder);
    res.send(respRes);
  }
}

module.exports = navigationPaginController;
