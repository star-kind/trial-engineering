const attachment = require("../common/db_attachment");
const sqlSentence = require("../../../config/AccountSql");

// 根据uid获取account数据的异步函数
async function getAccountById(uid) {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    db.get(sqlSentence.selectById, [uid], (err, row) => {
      if (err) {
        console.log(__filename, "Reject");
        reject(err);
      } else {
        console.log(__filename, "Resolve");
        resolve(row);
      }
    });
  });
}

async function test() {
  try {
    const uid = "2";
    const account = await getAccountById(uid);
    if (account === undefined) {
      console.log(__filename, "the account not exists");
    } else {
      console.log(account);
    }
  } catch (err) {
    console.error("error", err);
  } finally {
    console.error("finally");
  }
}
// test();

module.exports = getAccountById;
