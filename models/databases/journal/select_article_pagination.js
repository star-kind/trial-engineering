const attachment = require("../common/db_attachment");
const queries = require("../../../config/ArticleSql");

/**
 *
 * @param {*} accountEmail
 * @param {*} pageNumber
 * @param {*} rowsPerPage
 * @returns
 */
async function queryPagin(accountEmail, pageNumber, rowsPerPage) {
  const db = await attachment();
  // 计算偏移量
  const offset = (pageNumber - 1) * rowsPerPage;
  let paramArray = [accountEmail, rowsPerPage, offset];

  return new Promise((resolve, reject) => {
    db.all(queries.queryPagination, paramArray, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log("Rows:", rows);
        resolve(rows);
      }
    });
  });
}

async function test() {
  try {
    let accountEmail = "connected@vto.com";
    // 设置每页显示的记录数和要查询的页码
    const rowsPerPage = 5;
    const pageNumber = 1;
    const rows = await queryPagin(accountEmail, pageNumber, rowsPerPage);
    // 处理查询结果
    console.log("rows", rows);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    console.log("finally");
  }
}
// test();

module.exports = queryPagin;
