// imports
const express = require("express");
const accountController = require("../controllers/account.js");
const { signup, login } = accountController;
const accountAuth = require("../middleware/account.js");

const router = express.Router();

// signup
router.post("/signup", accountAuth.saveAccount, signup);

// login
router.post("/login", login);

module.exports = router;
