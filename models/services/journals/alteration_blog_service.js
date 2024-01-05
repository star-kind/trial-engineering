const Responses = require("../../../json/Responses");
const PublicVariable = require("../../../config/public_variable");
const renewal = require("../accounts/renewal_mail_service");
const updateArticleById = require("../../databases/journal/alter_article_by_id");
const getArticleByArticleID = require("../../databases/journal/get_article_by_id");

async function alterationArticleService(
  uid,
  usrEmail,
  articleId,
  title,
  articleCont
) {
  // 检查是否有任何一个为 null/undefined/""
  if (
    [uid, usrEmail, articleId, title, articleCont].some(
      (param) => param === null || param === undefined || param === ""
    )
  ) {
    console.log(
      "Error: One or more parameters (uid,usrEmail,articleId,title,articleCont) cannot be null, undefined, or empty."
    );
    return Responses.user_status_amiss;
  }

  // 去除所有空格后检查是否为 ""
  const trimmedTitle = title.toString().trim();
  const trimmedArticleCont = articleCont.toString().trim();
  if (trimmedTitle === "" || trimmedArticleCont === "") {
    console.log(
      "Error: Paramters cannot be null, undefined, or empty after removing spaces."
    );
    return Responses.param_empty;
  }

  // 检查 uid, articleId 的数据类型是否为 number
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
    return Responses.login_expire;
  }

  if (checkExist.data.id !== uid) {
    return Responses.user_status_amiss;
  }

  let checkArticleExist = await getArticleByArticleID(articleId);
  console.log("alterationArticleService checkArticleExist", checkArticleExist);
  if (!checkArticleExist) {
    return Responses.article_not_exists;
  } else if (checkArticleExist.accountid !== uid) {
    return Responses.article_not_belong;
  }

  await updateArticleById(articleId, articleCont.trim(), title.trim());
  let newRow = await getArticleByArticleID(articleId);

  return Object.assign({}, Responses.success, {
    article: newRow,
  });
}

async function test() {
  let uid = 6;
  let mail = "example@goxmail.com";
  let articleID = 6;
  let title = "     New TITLE     ";
  let cont = "     THE ARTICLE IS NEW Content    ";

  let results = await alterationArticleService(
    uid,
    mail,
    articleID,
    title,
    cont
  );
  console.log("results", results);
}
// test();

module.exports = alterationArticleService;
