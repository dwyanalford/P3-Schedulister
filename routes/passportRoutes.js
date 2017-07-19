var express = require("express");
var passpt = new express.Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
// var passport = require('passport'), LocalStrategy = require('passport-http').BasicStrategy;
var User = require('../models/User'); 

//Get Routes
//Signup

passpt.get('/signup', function(req,res){
  res.render('/signup');
});

//Login
passpt.get('/login', function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }else {
    res.redirect('/login');
  }
});


//POST Routes
//Create new user
passpt.post('/signup', function(req,res) {
	var username=req.body.username;
  var email=req.body.email;
	var password=req.body.password;
	var passwordc=req.body.passwordc;
  console.log(req.body);
	
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Enter valid email').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Password must be minimum six characters').len(6,32);
  req.checkBody('passwordc', 'Confirm password').notEmpty();
	req.checkBody('passwordc', 'Passwords do not match').equals(req.body.password);

	var errors= req.validationErrors();
	if(errors) {
		res.render('signup',
      {
        errors: errors
      });
	}
  else{
    var newUser = new User({
      username: username,
      email: email,
      password: password,
      passwordc: passwordc
    });
    console.log(newUser);

    User.createUser(newUser, function(err, user) {
      if(err) throw err;
      console.log(user);
    });

    req.flash('success_msg', 'Account Created! Please login');
    res.redirect('/');
  }
});

//Passport Information
passport.use(new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
    	if(err) throw err;
    	if(!user){
    		return done(null, false, {message: 'Unknown User'}); 
    	}
    User.comparePassword(password, user.password, function(err, isMatch) {
    	if(err) throw err;
    	if(isMath){
    		return done(null, user); 
    	} else{
    		return done(null, false, {message: 'Invalid password'}); 
    	}
  });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//Login Authenticator
passpt.post('/login',
passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }),
  function(req,res){
  	res.redirect("/");
  });
  
//Log out
passpt.get('/logout', function(req,res) {
req.logout();
req.flash('success_msg', 'You are logged out');
res.redirect('/');
});



module.exports=passpt;