var express = require("express");
var passRouter = new express.Router();


passRouter.get("/login", function(req, res) {
  res.render('login');
});

passRouter.get("/signup", function(req, res) {
  res.render('signup');
});

passRouter.post("/login", function(req, res) {
  res.render('login');
});

passRouter.post("/signup", function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var passwordc = req.body.passwordc;
  console.log(username);
});

module.exports = passRouter;