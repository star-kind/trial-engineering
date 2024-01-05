const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");

// 根据id删除某行数据的函数
async function deleteRowById(id) {
  const db = await attachment();
  db.run(queries.deleteJournal, [id], (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Deleted row with id ${id} from table`);
    }
  });
}

// deleteRowById(14);
module.exports = deleteRowById;
