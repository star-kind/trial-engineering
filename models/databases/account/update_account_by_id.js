const attachment = require("../common/db_attachment");
const sqlSentence = require("../../../config/AccountSql");

async function updateAccountEmailById(id, email) {
  const db = await attachment();
  let paramArr = [email, id];

  db.run(sqlSentence.updateMailById, paramArr, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Account updated successfully");
    }
  });
}

async function updateAccountPasswordById(id, password) {
  const db = await attachment();
  let paramArr = [password, id];

  db.run(sqlSentence.updatePwdById, paramArr, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Account updated successfully");
    }
  });
}

// updateAccountEmailById(1, "TTTHHH@example.com");
// updateAccountPasswordById(1, "xxxxxxxxxxxxxxxxxxxxxxxxxx");

module.exports = {
  updateAccountEmailById,
  updateAccountPasswordById,
};
