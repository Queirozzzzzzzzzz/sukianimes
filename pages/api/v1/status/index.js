import database from "/infra/database";

export default async function Status(req, res) {
  try {
    const updatedAt = new Date().toISOString();
    const postgresVersionResult = await database.getVersion();
    const postgresVersionValue = postgresVersionResult.rows[0].server_version;
    const maxConnectionsResult = await database.getMaxConnections();
    const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;
    const openedConnectionsResult = await database.getOpenedConnections();
    const openedConnectionsValue = openedConnectionsResult.rows[0].count;

    res.status(200).json({
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
