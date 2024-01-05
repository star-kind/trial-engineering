const attachment = require("../common/db_attachment");
const JournalObject = require("../../../json/JournalObj");
const checkJournalTable = require("./check_journal_tbl");
const getCurrentTimeString = require("../../../utils/get_current_time");
const queries = require("../../../config/ArticleSql");

async function insertArticle(journal) {
  const db = await attachment();

  journal.modifiedtime = getCurrentTimeString();
  let paramArr = [
    journal.accountemail,
    journal.article,
    journal.title,
    journal.accountid,
    journal.modifiedtime,
  ];

  db.run(queries.insertIntoJournal, paramArr, function (err) {
    if (err) {
      console.error(err.message);
    }
  });
}

async function test(articleObj) {
  await checkJournalTable();
  await insertArticle(articleObj);
}

for (let index = 0; index < 3; index++) {
  let articleObj = new JournalObject();
  articleObj.accountemail = "intelligence@vto.com";
  articleObj.accountid = 3;
  articleObj.article = "there divide " + index * 999;
  articleObj.title = "application list " + index * 999;
  //   test(articleObj);
}

module.exports = insertArticle;
