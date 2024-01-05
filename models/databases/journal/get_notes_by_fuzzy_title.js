const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");

async function searcAllNotehByTitle(title) {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    db.all(queries.searchByTitle, [`%${title}%`], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
        console.log("searcAllNotehByTitle.dbid", db);
      }
    });
  });
}

async function test() {
  let results = await searcAllNotehByTitle("Hello");
  console.log(results);
}
// test();

module.exports = searcAllNotehByTitle;
