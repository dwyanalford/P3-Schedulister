express = require("express");

var taskControl = require("../controllers/taskControl");

//path/requests to call ORM methods in controller. 
var router = new express.Router();
//get all tasks or specific for edit page info
router.get("/tasks/:id?", taskControl.index);

router.post("/tasks", taskControl.create);

//required for updating one task
router.patch("/tasks/:id", taskControl.update);

router.delete("/tasks/:id", taskControl.destroy);

//NR
router.get("/login", function(req, res) {
  res.render('login');
});

router.get("/signup", function(req, res) {
  res.render('signup');
});

router.post("/login", function(req, res) {
  res.render('login');
});

router.post("/signup",  function(req, res) {
  console.log("good");
});

module.exports = router;