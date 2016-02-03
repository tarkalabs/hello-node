import express from "express";
import RedditLib from "./reddit";

import {map, pick} from "lodash";
const REDDIT_FILE = "reddit_content.json";
var redditLib = new RedditLib(REDDIT_FILE);

var redditApp = express();

redditApp.get("/",(req, res) => {
  redditLib.readReddit().then((data)=>{
    res.render("index", {
      currentUser: req.session.currentUser,
      entries: data,
      viewCount: req.session.views});
  });
});

redditApp.post("/refresh", (req,res) => {
  redditLib.dumpReddit().then((_) => {
    res.redirect("/");
  });
});

export default redditApp;
