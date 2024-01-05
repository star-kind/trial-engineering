const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");

// 根据mail获取数据的异步函数
async function getArticleByMail(mail) {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    db.all(queries.selectByAccountEmail, [mail], (err, row) => {
      if (err) {
        console.log("get Article By Mail", "Reject");
        reject(err);
      } else {
        console.log("get Article By Mail", "Resolve");
        resolve(row);
      }
    });
  });
}

async function test() {
  try {
    const mail = "connected@vto.com";
    const articles = await getArticleByMail(mail);
    if (articles === undefined) {
      console.log("the Article not exists");
    } else {
      console.log(articles);
      console.log("length", articles.length);
    }
  } catch (err) {
    console.error("error", err);
  } finally {
    console.error("finally");
  }
}
// test();

module.exports = getArticleByMail;
