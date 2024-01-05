const attachment = require("../common/db_attachment");
const sqlSentence = require("../../../config/AccountSql");

// 根据mail获取account数据的异步函数
async function getAccountByMail(mail) {
  const db = await attachment();
  return new Promise((resolve, reject) => {
    db.get(sqlSentence.selectByMail, [mail], (err, row) => {
      if (err) {
        console.log("getAccountByMail", "Reject");
        reject(err);
      } else {
        console.log("getAccountByMail", "Resolve");
        resolve(row);
      }
    });
  });
}

async function test() {
  try {
    const mail = "fetchDays@olg.com";
    const account = await getAccountByMail(mail);
    if (account === undefined) {
      console.log(__filename, "The account not exists");
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

module.exports = getAccountByMail;
