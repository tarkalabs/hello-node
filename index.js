"use strict"
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const map = require("lodash/map");
const pick = require("lodash/pick");
const reddit = require("./lib/reddit");

const REDDIT_FILE = "reddit_content.json";
var app = express();

app.set("views", "./views");
app.set("view engine", "jade");
app.use(session({
  secret: "this is secret",
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req, res) => {
  if(req.session.views) {
    req.session.views++
  } else {
    req.session.views = 1;
  }
  reddit.readReddit(REDDIT_FILE,(err,data) => {
    if(err) {
      res.status(500);
      res.json(err);
      return;
    }
    let content = JSON.parse(data);
    let entries = map(content.data.children, (child)=> pick(child.data, ["title","score","num_comments","url"]))
    console.log(entries);
    res.render("index", {
      currentUser: req.session.currentUser,
      entries: entries,
      viewCount: req.session.views});
  });
});

app.get("/login", (_, res) => res.render("login") )
app.post("/login", (req, res) => {
  let username = req.body.login;
  let password = req.body.password;
  if(username!=="admin" || password!=="password") {
    res.render("login",{error: "Username or password incorrect"});
  } else {
    req.session.currentUser = "admin"
    res.redirect("/");
  }
});

app.post("/refresh", (req,res) => {
  reddit.dumpReddit(REDDIT_FILE,(err) => {
    if(err) {
      res.status(500);
      res.json(err);
      return;
    }
    res.json({message: "content refreshed"});
  })
})

app.listen(process.env.PORT || 3000);
