const sqlSentence = require("../../../config/AccountSql");
const attachment = require("../common/db_attachment");
const Account = require("../../../json/Account");
const checkAndCreateTable = require("./check_create_account_tbl");

async function insertAccount(account) {
  const db = await attachment();
  var paramArr = [
    account.email,
    account.password,
    account.salt,
    account.initvector,
  ];

  db.run(sqlSentence.insertAnAccount, paramArr, function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}

function test() {
  let userObj = new Account();
  userObj.email = "fetchDays@olg.com";
  userObj.password = "zmv8934v30495fb1er9e9fefj";
  userObj.salt = "0v0345500bpswv6456v6165wtu";
  userObj.initvector = "r1v68ebs6z565r488t6dborh";
  checkAndCreateTable();
  insertAccount(userObj);
}
// test();

module.exports = insertAccount;
