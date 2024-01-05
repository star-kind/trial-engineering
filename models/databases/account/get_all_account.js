const attachment = require("../common/db_attachment");
const sqlSentence = require("../../../config/AccountSql");

async function getAccountList() {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    // 查询数据并输出
    db.all(sqlSentence.selectAllAccount, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        rows.forEach((row) => {
          let result = `${row.id} | ${row.email} | ${row.password} | ${row.salt} | ${row.initvector} | ${row.authority} | ${row.updatetime}`;
          console.log("result:", result);
        });
        resolve(rows);
      }
    });
  });
}

async function test() {
  let rows = await getAccountList();
  console.log(rows);
}
// test();

module.exports = getAccountList;
