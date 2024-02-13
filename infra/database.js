const { Client } = require("pg");

const configurations = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.NODE_ENV !== "development",
};

async function query(queryObject) {
  const client = new Client(configurations);
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

async function checkConnection() {
  try {
    const connection = await query("SELECT * from pg_stat_activity");
    return connection;
  } catch (error) {
    console.log(error);
  }
}

async function getAccount(email) {
  const account = await query({
    text: `SELECT * FROM account WHERE email = $1;`,
    values: [email],
  });

  return account;
}

async function saveAccount(data) {
  const account = await query({
    text: `INSERT INTO account (accountname, email, password, created_at) VALUES ($1, $2, $3, $4) `,
    values: [data.accountname, data.email, data.password, data.created_at],
  });

  return account;
}

export default Object.freeze({
  query,
  checkConnection,
  getAccount,
  saveAccount,
});
