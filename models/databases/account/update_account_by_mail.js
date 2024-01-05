const sqlSentence = require("../../../config/AccountSql");
const attachment = require("../common/db_attachment");

async function updateAccountEmailByMail(newEmail, previousMail) {
  const db = await attachment();
  let paramArr = [newEmail, previousMail];

  db.run(sqlSentence.updateMailByMail, paramArr, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Execution completed, even if not actually successful.");
    }
  });
}

async function updateAccountPasswordByMail(password, accountMail) {
  const db = await attachment();
  let paramArr = [password, accountMail];

  db.run(sqlSentence.updatePwdByMail, paramArr, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Execution completed, even if not actually successful.");
    }
  });
}

// updateAccountEmailByMail("NewTheLevel@example.com", "TTTHHH@example.com");
// updateAccountPasswordByMail("HHHHHHHHHHHHHHHHHHHH", "NewTheLevel@example.com");

module.exports = {
  updateAccountEmailByMail,
  updateAccountPasswordByMail,
};
