const database = require("../infra/database.js");

async function Status(req, res) {
  try {
    const updatedAt = new Date().toISOString();
    const postgresVersionResult = await database.query("SHOW server_version;");
    const postgresVersionValue = postgresVersionResult.rows[0].server_version;
    const maxConnectionsResult = await database.query("SHOW max_connections;");
    const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;
    const databaseName = process.env.POSTGRES_DB;
    const openedConnectionsResult = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    const openedConnectionsValue = openedConnectionsResult.rows[0].count;

    res.json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          postgres_version: postgresVersionValue,
          max_connections: parseInt(maxConnectionsValue),
          opened_connections: openedConnectionsValue,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while processing your request." });
  }
}

module.exports = {
  Status,
};
