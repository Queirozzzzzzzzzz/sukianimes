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

async function getVersion() {
  try {
    const connection = await query("SHOW server_version;");
    return connection;
  } catch (error) {
    console.log(error);
  }
}

async function getOpenedConnections() {
  try {
    const databaseName = process.env.POSTGRES_DB;
    const connection = await query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    return connection;
  } catch (error) {
    console.log(error);
  }
}

async function getMaxConnections() {
  try {
    const connection = await query("SHOW max_connections;");
    return connection;
  } catch (error) {
    console.log(error);
  }
}

export default Object.freeze({
  query,
  getVersion,
  getMaxConnections,
  getOpenedConnections,
});
