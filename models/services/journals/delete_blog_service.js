const Responses = require("../../../json/Responses");
const PublicVariable = require("../../../config/public_variable");
const renewal = require("../accounts/renewal_mail_service");
const deleteRowById = require("../../databases/journal/delete_article_by_id");
const getArticleByArticleID = require("../../databases/journal/get_article_by_id");

async function deleteArticleService(uid, usrEmail, articleId) {
  // 检查是否有任何一个为 null/undefined/""
  if (
    [uid, usrEmail, articleId].some(
      (param) => param === null || param === undefined || param === ""
    )
  ) {
    console.log(
      "Error: One or more parameters cannot be null, undefined, or empty."
    );
    return Responses.user_status_amiss;
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
  console.log("deleteArticleService checkArticleExist", checkArticleExist);
  if (!checkArticleExist) {
    return Responses.article_not_exists;
  } else if (checkArticleExist.accountid !== uid) {
    return Responses.article_not_belong;
  }

  await deleteRowById(articleId);
  let mergedObject = Object.assign({}, Responses.success, {
    operate_id: articleId,
  });
  return mergedObject;
}

async function test(articleID) {
  let uid = 3;
  let mail = "NewGRMail@oti.com";

  let results = await deleteArticleService(uid, mail, articleID);
  console.log("results", results);
}

let array = [1, 3, 5];
for (let i = 0; i < array.length; i++) {
  //   test(array[i]);
}

module.exports = deleteArticleService;
