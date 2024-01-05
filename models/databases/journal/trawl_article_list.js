const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");

async function trawlAllArticles() {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    db.all(queries.selectAllArticle, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        rows.forEach((row) => {
          let rowSentence = `${row.id} | ${row.accountemail} | ${row.article} | ${row.title} | ${row.accountid} | ${row.modifiedtime} | ${row.visual}`;
          console.log(rowSentence);
        });
        resolve(rows);
      }
    });
  });
}

async function test() {
  let result = await trawlAllArticles();
  console.log("查询成功，结果为:", result);
}
// test();

module.exports = trawlAllArticles;
