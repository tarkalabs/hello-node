"use strict"
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import {map, pick} from "lodash";
import RedditLib from "./lib/reddit";

const REDDIT_FILE = "reddit_content.json";
let redditLib = new RedditLib(REDDIT_FILE);
let app = express();

app.set("views", "./views");
app.set("view engine", "jade");
app.use(session({
  secret: "this is secret",
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));

var auth = (req, res, next) => {
  if(req.session.currentUser) {
    next();
  } else {
    if(req.url==="/login") {
      next();
    } else {
      res.redirect("/login");
    }
  }
}
app.use(auth);
app.get("/logout", (req,res) => {
  delete req.session.currentUser;
  res.redirect("/");
});
app.get("/",(req, res) => {
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
  redditLib.dumpReddit((err) => {
    if(err) {
      res.status(500);
      res.json(err);
      return;
    }
    res.redirect("/");
  })
})

app.listen(process.env.PORT || 3000);
