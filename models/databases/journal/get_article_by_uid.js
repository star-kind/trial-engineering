const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");

// 根据获取数据的异步函数
async function getArticleByUID(accountid) {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    db.all(queries.selectByAccountId, [accountid], (err, row) => {
      if (err) {
        console.log("getArticleByUID", "Reject");
        reject(err);
      } else {
        console.log("getArticleByUID", "Resolve");
        resolve(row);
      }
    });
  });
}

async function test() {
  try {
    const article = await getArticleByUID(1);
    if (!article) {
      console.log("getArticleByUID The article not exists");
    } else {
      console.log(article);
    }
  } catch (err) {
    console.error("error", err);
  } finally {
    console.error("finally");
  }
}
// test();

module.exports = getArticleByUID;
