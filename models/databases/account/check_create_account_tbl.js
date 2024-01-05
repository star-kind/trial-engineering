const PublicVariable = require("../../../config/public_variable");
const attachment = require("../common/db_attachment");
const sqlSentence = require("../../../config/AccountSql");

// 检查表是否存在，如果不存在则创建
async function checkAndCreateTable() {
  const db = await attachment();
  let tbl = PublicVariable.AccountTableName;
  return new Promise((resolve, reject) => {
    db.all(sqlSentence.searchTblExist, [tbl], (err, rows) => {
      if (err) {
        console.error("Error checking table existence:", err.message);
        return;
      }
      if (rows.length === 0) {
        // 表不存在，创建表
        db.run(sqlSentence.createAccountsTbl, function (err) {
          if (err) {
            console.error("Error creating table:", err.message);
            reject(err);
          } else {
            console.log("Table created or already exists.");
            resolve();
          }
        });
      }
    });
  });
}
// checkAndCreateTable();

module.exports = checkAndCreateTable;
