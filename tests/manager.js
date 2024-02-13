const database = require("../infra/database.js");
const retry = require("async-retry");

async function waitForAllServices() {
  await waitForDatabase();
  await waitForWebServer();

  async function waitForDatabase() {
    return await retry(
      async (bail, tries) => {
        if (tries >= 25) {
          console.log(`Trying to connect to Database, try ${tries}.`);
        }
        const connection = await database.checkConnection();
        if (connection) {
          connection.end();
          console.log("COE");
          return true;
        } else {
          console.log(connection);
        }
      },
      {
        retries: 15,
        minTimeout: 10,
        maxTimeout: 1000,
        factor: 1.1,
      },
    );
  }

  async function waitForWebServer() {
    return await retry(
      async (bail, tries) => {
        if (tries >= 25) {
          console.log(`Trying to connect to Database, try ${tries}.`);
        }

        await fetch("http://localhost:3592/api/v1/status");
      },
      {
        retries: 50,
        minTimeout: 10,
        maxTimeout: 1000,
        factor: 1.1,
      },
    );
  }
}

module.exports = {
  waitForAllServices,
};
