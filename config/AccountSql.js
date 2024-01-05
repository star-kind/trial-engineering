const PublicVariable = require("./public_variable");

let sqlSentence = {
  viewTblList: 'SELECT name FROM sqlite_master WHERE type = "table"',

  updateMailByMail: `UPDATE ${PublicVariable.AccountTableName} SET email=?, updatetime = datetime('now') WHERE email=?`,
  updatePwdByMail: `UPDATE ${PublicVariable.AccountTableName} SET password=?, updatetime = datetime('now') WHERE email=?`,

  insertAnAccount: `INSERT INTO ${PublicVariable.AccountTableName} (email,password,salt,initvector) VALUES (?,?,?,?)`,

  createAccountsTbl: `CREATE TABLE IF NOT EXISTS ${PublicVariable.AccountTableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE CHECK(length(email) <= 60),
    password TEXT NOT NULL UNIQUE CHECK(length(password) <= 200),
    salt TEXT NOT NULL UNIQUE CHECK(length(salt) <= 200),
    initvector TEXT NOT NULL UNIQUE CHECK(length(initvector) <= 200),
    authority INTEGER DEFAULT 0,
    updatetime DATETIME DEFAULT (datetime('now'))
    );`,
  searchTblExist: `SELECT name FROM sqlite_master WHERE type='table' AND name=?`, //查询指定名称的表是否存在于sqlite_master表中

  selectAllAccount: `SELECT id,email,password,salt,initvector,authority,updatetime FROM ${PublicVariable.AccountTableName}`,

  selectById: `SELECT id,email,password,salt,initvector,updatetime FROM ${PublicVariable.AccountTableName} WHERE id=?`,

  updateMailById: `UPDATE ${PublicVariable.AccountTableName} SET email=?, updatetime = datetime('now') WHERE id=?`,
  updatePwdById: `UPDATE ${PublicVariable.AccountTableName} SET password=?, updatetime = datetime('now') WHERE id=?`,

  selectByMail: `SELECT id,email,password,salt,initvector,authority,updatetime FROM ${PublicVariable.AccountTableName} WHERE email=?`,
};

module.exports = sqlSentence;
