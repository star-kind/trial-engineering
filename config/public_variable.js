const getProjectRoot = require("../utils/get_root_dir");
const path = require("path");

const PublicVariable = {
  DataBaseName: path.join(getProjectRoot() + "/MineProjectDataBase.db"),

  TokenSecretKey: "YourTokenSecretKeyIsYourTokenSecretKey",
  ExpireHour: 8,

  AccountTableName: "accounts",
  JournalTableName: "journals",

  EmailRegex: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  rowsPerPage: 5, // 分页模型中每页设置的数据行数

  PassWordUpperLimit: 72,
  PassWordLowerLimit: 4,
};

module.exports = PublicVariable;
