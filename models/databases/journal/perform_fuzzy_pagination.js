const attachment = require("../common/db_attachment");
const PublicVariable = require("./../../../config/public_variable");

async function performFuzzyPagination(title, page, perPage) {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    let sentence = `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName} WHERE title LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`;

    const offset = (page - 1) * perPage;
    let paramArr = [`%${title}%`, perPage, offset];

    db.all(sentence, paramArr, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function test() {
  let rows = await performFuzzyPagination("Hello", 1, 5);
  console.log(rows);
}
// test();

module.exports = performFuzzyPagination;
