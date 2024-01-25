const database = require("../infra/database.js");

async function status(req, res) {
  const result = await database.query("SELECT 1 + 1 as sum;");

  return result;
}

module.exports = {
  status,
};
