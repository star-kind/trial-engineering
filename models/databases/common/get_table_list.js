const attachment = require("./db_attachment");
const sqlSentence = require("../../../config/AccountSql");

async function getTableList() {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    // 查询全部数据表
    db.all(sqlSentence.viewTblList, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function test() {
  let tables = await getTableList();
  console.log(tables);
}
// test();

module.exports = getTableList;
