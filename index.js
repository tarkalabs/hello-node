"use strict"
const express = require("express");
const session = require("express-session");
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

app.get("/",(req, res) => {
  if(req.session.views) {
    req.session.views++
  } else {
    req.session.views = 1;
  }
  reddit.readReddit(REDDIT_FILE,(err,data) => {
    if(err) {
      res.status(500);
      res.json(JSON.stringify(err));
      return;
    }
    let content = JSON.parse(data);
    let entries = map(content.data.children, (child)=> pick(child.data, ["title","score","num_comments","url"]))
    console.log(entries);
    res.render("index", {entries: entries, viewCount: req.session.views});
  });
});

app.post("/refresh", (req,res) => {
  reddit.dumpReddit(REDDIT_FILE,(err) => {
    if(err) {
      res.status(500);
      res.json(JSON.stringify(err));
      return;
    }
    res.json({message: "content refreshed"});
  })
})

app.listen(process.env.PORT || 3000);
