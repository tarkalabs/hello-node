import express from "express";
import RedditLib from "./reddit";

import {map, pick} from "lodash";
const REDDIT_FILE = "reddit_content.json";
var redditLib = new RedditLib(REDDIT_FILE);

var redditApp = express();

redditApp.get("/",(req, res) => {
  redditLib.readReddit((err,data) => {
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

redditApp.post("/refresh", (req,res) => {
  redditLib.dumpReddit((err) => {
    if(err) {
      res.status(500);
      res.json(err);
      return;
    }
    res.redirect("/");
  })
});

export default redditApp;
