const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const passport = require("passport");

Router.get("/", (req, res) => {
  res.render("home");
});

Router.get("/register", (req, res) => {
  res.render("register");
});

Router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  newUser.first_name = req.body.first_name;
  newUser.email = req.body.email;
  newUser.phone = req.body.phone;
  newUser.userType = req.body.userType;
  User.register(newUser, req.body.password, function(err, user) {
    if (!err) {
      passport.authenticate("local")(req, res, function() {
        console.log(user);
        //res.redirect("/opportunity");
      });
    }
  });
});

Router.get("/login", (req, res) => {
  //res.render("login");
});

Router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/opportunity",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(req, res) {}
);

Router.get("/logout", (req, res) => {
  req.logout();
  //res.redirect("/");
});

Router.get("*", (req, res) => {
  //res.render("error");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  //res.redirect("/login");
}

module.exports = Router;
