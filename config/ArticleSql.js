const performFuzzyPagination = require("../models/databases/journal/perform_fuzzy_pagination");
const PublicVariable = require("./public_variable");

let queries = {
  selectTblByName: `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,

  deleteJournal: `DELETE FROM ${PublicVariable.JournalTableName} WHERE id = ?`,

  selectById: `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName} WHERE id=?`,

  selectByAccountId: `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName} WHERE accountid=?`,

  insertIntoJournal: `INSERT INTO ${PublicVariable.JournalTableName} (accountemail,article,title,accountid,modifiedtime) VALUES (?,?,?,?,?)`,

  selectByAccountEmail: `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName} WHERE accountemail=?`,

  selectAllArticle: `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName}`,

  updateById: `UPDATE ${PublicVariable.JournalTableName} SET article=?,title=?,modifiedtime=? WHERE id=?`,

  createJournalTbl: `CREATE TABLE IF NOT EXISTS ${PublicVariable.JournalTableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountemail TEXT NOT NULL CHECK(length(accountemail) <= 60),
    article TEXT(10000) NOT NULL,
    title TEXT(500) NOT NULL,
    accountid INTEGER NOT NULL,
    modifiedtime TEXT NOT NULL,
    visual INTEGER DEFAULT 0
    );`,

  searchByTitle: `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName} WHERE title LIKE ? ORDER BY id;`,

  queryPagination: `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName} WHERE accountemail = ? ORDER BY id DESC LIMIT ? OFFSET ?`,

  getTblList: 'SELECT name FROM sqlite_master WHERE type = "table"',

  performFuzzyPagination: `SELECT id,accountemail,article,title,accountid,modifiedtime,visual FROM ${PublicVariable.JournalTableName} WHERE title LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`,
};

module.exports = queries;
