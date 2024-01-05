const Responses = require("../../../json/Responses");
const getArticleByArticleID = require("../../databases/journal/get_article_by_id");
const getArticleByMail = require("../../databases/journal/select_article_by_mail");
const PublicVariable = require("../../../config/public_variable");
const renewal = require("../accounts/renewal_mail_service");

async function getSingleArticleService(uid, usrEmail, articleId) {
  // 检查 uid, usrEmail, articleId 是否有任何一个为 null/undefined/""
  if (
    [uid, usrEmail, articleId].some(
      (param) => param === null || param === undefined || param === ""
    )
  ) {
    console.log(
      "Error: One or more parameters (uid, usrEmail, articleId) cannot be null, undefined, or empty."
    );
    return Responses.user_status_amiss;
  }

  // 检查 uid, pageOrder 的数据类型是否为 number
  if (typeof uid !== "number" || typeof articleId !== "number") {
    console.log("Error: uid, articleId must be of type number.");
    return Responses.invaild_type;
  }

  // 如果参数：email 不符合：正则表达式(邮箱地址),return错误信息
  if (!PublicVariable.EmailRegex.test(usrEmail)) {
    return Responses.invalid_email;
  }

  // 检查user的存在与否
  let checkExist = await renewal.checkUserEexistence(usrEmail);
  if (checkExist.flag === false) {
    return Responses.no_such_user;
  }

  if (checkExist.data.id !== uid) {
    return Responses.article_not_belong;
  }

  let totalDataList = await getArticleByMail(usrEmail);
  console.log("totalDataList length", totalDataList.length);

  let queryResult = await getArticleByArticleID(articleId);
  return buildResponse(queryResult);
}

// 构建返回结果
function buildResponse(queryResult) {
  if (!queryResult) {
    console.log("queryResult Is empty");
    return Object.assign({}, Responses.success, {
      article: {},
    });
  }

  console.log("queryResult Isn't empty");

  return Object.assign({}, Responses.success, {
    article: queryResult,
  });
}

async function test() {
  let result = await getSingleArticle(6, "example@goxmail.com", 3);
  console.log("test.result", result);
}
// test();
module.exports = getSingleArticleService;
