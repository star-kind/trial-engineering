const Responses = require("../../../json/Responses");
const insertArticle = require("../../databases/journal/insert_article");
const PublicVariable = require("../../../config/public_variable");
const renewal = require("../accounts/renewal_mail_service");
const JournalObject = require("../../../json/JournalObj");

async function generateBlogService(uid, usrEmail, title, articleCont) {
  if (!uid || !usrEmail) {
    return Responses.login_expire;
  }

  if (!title || !articleCont) {
    return Responses.param_empty;
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

  let journalObj = new JournalObject(
    usrEmail,
    articleCont.trim(),
    title.trim(),
    uid
  );
  insertArticle(journalObj);
  return Responses.success;
}

function test(title, articleCont) {
  let uid = 1;
  let usrEmail = "Account@qq.com";
  generateBlogService(uid, usrEmail, title, articleCont)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
}

for (let index = 11; index < 31; index++) {
  let title = "Further improvement " + index * 3;
  let articleCont = "Corrective latest essential " + index * 2;
    // test(title, articleCont);
}

module.exports = generateBlogService;
