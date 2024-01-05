const attachment = require("../common/db_attachment");
const getCurrentTimeString = require("../../../utils/get_current_time");
const queries = require("../../../config/ArticleSql");

async function updateArticleById(id, article, title) {
  const db = await attachment();
  let timeStr = getCurrentTimeString();
  let paramArray = [article, title, timeStr, id];

  db.run(queries.updateById, paramArray, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Article updated successfully");
    }
  });
}

// updateArticleById(1, "undefined article Contents", "undefined Title");
module.exports = updateArticleById;
