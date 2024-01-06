// imports
const express = require("express");
const app = express();
const port = 3592;

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/svg", express.static(__dirname + "public/svg"));

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.render("home");
});

app.get("/offer-upgrade", (req, res) => {
  res.render("offer-upgrade");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/series/:series", (req, res) => {
  const series = req.params.series;
  res.render("series", { series: series });
});

// Listen on port 3592
app.listen(port, () => console.info(`Listening on port ${port}`));
