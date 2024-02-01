const express = require("express");
const database = require("../infra/database.js");

async function saveAccount(req, res, next) {
  try {
    const email = await database.query({
      text: `SELECT * FROM account WHERE email = $1;`,
      values: [req.body.email],
    });

    if (email.rows.length > 0) {
      return res.status(409).send("Email already taken");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
}

module.exports = {
  saveAccount,
};
