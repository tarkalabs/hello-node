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
    res.render("index", {
      currentUser: req.session.currentUser,
      entries: data,
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
