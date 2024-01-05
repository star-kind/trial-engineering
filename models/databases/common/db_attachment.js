const sqlite3 = require("sqlite3").verbose();
const PublicVariable = require("../../../config/public_variable");

function attachment() {
  return new Promise((resolve, reject) => {
    let attachment = new sqlite3.Database(
      `${PublicVariable.DataBaseName}`,
      (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          console.log(
            `Connected the ${PublicVariable.DataBaseName} database Before:`,
            attachment
          );
          // 将自定义标识符附加到数据库连接对象上
          attachment.connectionId = process
            .hrtime()
            .reduce((acc, value) => acc * 1e9 + value, 0);
          //   attachment.connectionId = process.hrtime();
          console.log(
            `Connected the ${PublicVariable.DataBaseName} database After:`,
            attachment
          );
          resolve(attachment);
        }
      }
    );
  });
}

async function test() {
  let db = await attachment();
  console.log("attachment", db);
}
// test();

module.exports = attachment;
