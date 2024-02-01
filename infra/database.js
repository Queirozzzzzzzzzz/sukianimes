const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
});

async function query(queryObject) {
  try {
    const result = await pool.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  query: query,
};
