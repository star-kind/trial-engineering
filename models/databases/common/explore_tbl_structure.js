const attachment = require("./db_attachment");
const PublicVariable = require("../../../config/public_variable");

async function getTableStructure(tableName) {
  let db = await attachment();
  return new Promise((resolve, reject) => {
    const query = `PRAGMA table_info(${tableName})`;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
        // rows.forEach((row) => {
        //   console.log("Column:", row.name);
        //   console.log("Type:", row.type);
        //   console.log("Not Null:", row.notnull);
        //   console.log("Default Value:", row.dflt_value);
        //   console.log("Primary Key:", row.pk);
        //   console.log("------");
        // });
      }
    });
  });
}

async function test() {
  let array = [
    PublicVariable.AccountTableName,
    PublicVariable.JournalTableName,
  ];

  for (let index = 0; index < array.length; index++) {
    let element = array[index];
    let result = await getTableStructure(element);
    console.log(result);
    console.log("------");
  }
}
// test();

module.exports = getTableStructure;
