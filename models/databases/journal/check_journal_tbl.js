const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");
const PublicVariable = require("../../../config/public_variable");

// 检查表是否存在，如果不存在则创建
async function checkJournalTable() {
  const db = await attachment();
  let tbl = PublicVariable.JournalTableName;
  db.all(queries.selectTblByName, [tbl], (err, rows) => {
    if (err) {
      console.error("Error checking table existence:", err.message);
      return;
    }
    if (rows.length === 0) {
      // 表不存在，创建表
      db.run(queries.createJournalTbl, (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
          return;
        }
        console.log(`Table ${PublicVariable.JournalTableName} created.`);
      });
    }
  });
}
// checkJournalTable();

module.exports = checkJournalTable;
