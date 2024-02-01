//Modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../infra/database.js");

const sessionExpirationDate = 1 * 24 * 60 * 60 * 1000;

// Account register
async function signup(req, res) {
  try {
    const { accountname, email, password1, password2 } = req.body;

    if (!accountname || !email || !password1 || !password2) {
      throw new Error("All fields are required");
    }

    if (password1 != password2) {
      throw new Error("Passwords do not match");
    }

    const password = password1;

    const data = {
      accountname,
      email,
      password: await bcrypt.hash(password, 10),
      created_at: new Date(),
    };

    //Save account
    const account = await database.query({
      text: `INSERT INTO account (accountname, email, password, created_at) VALUES ($1, $2, $3, $4) `,
      values: [data.accountname, data.email, data.password, data.created_at],
    });

    if (account) {
      let token = jwt.sign({ id: account.id }, process.env.SECRET_KEY, {
        expiresIn: sessionExpirationDate,
      });

      res.cookie("jwt", token, {
        maxAge: sessionExpirationDate,
        httpOnly: true,
      });
    } else {
      return req.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

  res.redirect("/");
}

// Account login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const account = await database.query({
      text: `SELECT * FROM account WHERE email = $1;`,
      values: [email],
    });

    if (account.rowCount) {
      const isValidPassword = await bcrypt.compare(
        password,
        account.rows[0].password,
      );

      if (isValidPassword) {
        let token = jwt.sign({ id: account.id }, process.env.SECRET_KEY, {
          expiresIn: sessionExpirationDate,
        });

        res.cookie("jwt", token, {
          maxAge: sessionExpirationDate,
          httpOnly: true,
        });

        //Redirect
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

  res.redirect("/");
}

module.exports = {
  signup,
  login,
};
