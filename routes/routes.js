var express = require("express");
var path = require("path");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User'); 

var apiRoutes = require("./apiRoutes");
var router = new express.Router();

router.use("/api", apiRoutes);

router.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


//Passport

router.post('/signup/user',
  passport.authenticate('local-signup', { successRedirect: '/',
                                   failureRedirect: '/sigunp/user',
                                   failureFlash: true }),
  function(req,res){
  	res.redirect("/");
  });

router.post('/login/user',
  passport.authenticate('local-signup', { successRedirect: '/',
                                   failureRedirect: '/login/user',
                                   failureFlash: true }),
  function(req,res){
  	res.redirect("/");
  });


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.get('/signup/user', function(req,res){
  res.render('/signup');
});

//Login
router.get('/login/user', function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }else {
    res.redirect('/login');
  }
});


//signup processing
passport.use('local-signup', new LocalStrategy({
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

//password
passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
  function(username, password, done) {
    User.getUserById(username, function(err, user){
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

// //altenrative
// route.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

module.exports = router;