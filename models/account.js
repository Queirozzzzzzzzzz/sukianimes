const database = require("../infra/database.js");

async function Accounts(req, res) {
  const account = `CREATE TABLE IF NOT EXISTS 
    account (
      id SERIAL PRIMARY KEY,
      accountname VARCHAR(128) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(128) NOT NULL,
      profile_picture VARCHAR(255),
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP,
      last_login TIMESTAMP
    )`;
  try {
    await database.query(account);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  Accounts,
};
