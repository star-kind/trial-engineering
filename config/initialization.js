const checkAndCreateTable = require("../models/databases/account/check_create_account_tbl");
const getTableList = require("../models/databases/common/get_table_list");
const writeInfo = require("../utils/write_info");
const checkJournalTable = require("../models/databases/journal/check_journal_tbl");

function tblInitialization() {
  console.log("tbl_initialization.account");
  checkAndCreateTable();
  console.log("tbl_initialization.journal");
  checkJournalTable();
  // glance tables
  getTableList();
}

function requestsInformation(req) {
  let info = `method: ${req.method}\t `;
  info += `url: ${req.url}\t  `;

  let params = JSON.stringify(req.params);
  info += `params: ${params}\n  `;

  info += `route: ${req.route}\t  `;
  info += `ip: ${req.ip}\t  `;
  info += `accepts['POST','GET']: ${req.accepts[("POST", "GET")]}\t `;
  info += `path: ${req.path}\t  `;
  info += `hostname: ${req.hostname}\t  `;
  info += `protocal: ${req.protocal}\t  `;
  info += `originalUrl: ${req.originalUrl}\t  `;
  info += `acceptedLanguages: ${req.acceptedLanguages}\t  `;
  info += `xhr: ${req.xhr}\t  `;
  info += `xhr: ${req.cookies}\t  `;

  let headers = JSON.stringify(req.headers);
  info += `headers: ${headers}\n  `;

  let body = JSON.stringify(req.body);
  info += `body: ${body}\t  `;

  let query = JSON.stringify(req.query);
  info += `query: ${query}\n  `;
  console.log(info);

  writeInfo({ Information: info }, "Requests");
}

module.exports = { tblInitialization, requestsInformation };
