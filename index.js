"use strict"
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import redditApp from "./lib/reddit_app";

let app = express();

app.set("views", "./views");
app.set("view engine", "jade");
app.use(session({
  secret: "this is secret",
  resave: true,
  saveUninitialized: true
}));
app.use(express.static("public"));
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
//app.use(auth);
app.get("/logout", (req,res) => {
  delete req.session.currentUser;
  res.redirect("/");
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
app.use(redditApp);
app.listen(process.env.PORT || 3000);
