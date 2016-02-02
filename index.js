"use strict"
const express = require("express");
const reddit = require("./lib/reddit");
const REDDIT_FILE = "reddit_content.json";
var app = express();

app.get("/",(req, res) => {
  reddit.readReddit(REDDIT_FILE,(err,data) => {
    if(err) {
      res.status(500);
      res.json(JSON.stringify(err));
      return;
    }
    let content = JSON.parse(data);
    res.json(content);
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
