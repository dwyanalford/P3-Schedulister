var User = require ("../models/User");

module.exports = {
    output: (req, res) => {
  console.log(res);
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var passwordc = req.body.passwordc;
  console.log(username);
    },
  
  // create: (req, res) => {
  //   User.create(req.body)
  //     .then( doc => {res.json(doc)
  //     }).catch( err => {res.json(err)
  //     });
  // },};
  // update: (req, res) => {
  //   User.update({_id:req.params.id}, req.body)
  //     .then( doc => {res.json(doc)
  //     }).catch( err => {res.json(err)
  //     });
  // },
  // //use in User Admin.js
  // destroy: (req, res) => {
  //   User.remove({_id:req.params.id})
  //     .then( doc => {res.json(doc)
  //     }).catch( err => {res.json(err)
  //     });
  }
