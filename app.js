// imports
const express = require("express");
const { status } = require("./models/status.js");

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

app.get("/api/v1/status", async (req, res) => {
  const result = await status(req, res);
  console.log(result.rows);
  res.status(200).json({ chave: "valor", result });
});

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

app.get("/series/:series/:season", (req, res) => {
  res.render("series", {
    series: req.params.series,
    season: req.params.season,
  });
});

app.get("/series/:series/watch/:season/:episode", (req, res) => {
  res.render("watch", {
    series: req.params.series,
    season: req.params.season,
    episode: req.params.episode,
  });
});

app.get("/watchlater", (req, res) => {
  res.render("watchlater");
});

app.get("/playlists", (req, res) => {
  res.render("playlists");
});

app.get("/playlist/:playlist", (req, res) => {
  res.render("playlist");
});

app.get("/history", (req, res) => {
  res.render("history");
});

app.get("/account/:section", (req, res) => {
  res.render("account", { section: req.params.section });
});

// Listen on port 3592
app.listen(port, () => console.info(`Listening on port ${port}`));
