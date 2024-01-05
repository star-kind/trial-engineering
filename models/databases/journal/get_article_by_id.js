const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");

// 获取数据的异步函数
async function getArticleByArticleID(articleID) {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    db.get(queries.selectById, [articleID], (err, row) => {
      if (err) {
        console.log("getArticleByArticleID", "Reject");
        reject(err);
      } else {
        console.log("getArticleByArticleID", "Resolve");
        resolve(row);
      }
    });
  });
}

async function test() {
  try {
    const article = await getArticleByArticleID(1);
    if (article === undefined) {
      console.log(__filename, "the article not exists");
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

module.exports = getArticleByArticleID;
