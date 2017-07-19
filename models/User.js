var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required",
    unique: true
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
    unique: true
  },
  password: {
    type: String,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be at least 6 characters."
    ]
  },

  userCreated: {
    type: Date,
    default: Date.now
  },

  todos: [{
    //todo Schema info
    type: Schema.Types.ObjectId,
    ref: "Task"
  }]

});

userSchema.methods.generateHash = function(password) {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  
});


userSchema.methods.getUserByUsername = function(username, callback){
  var query= {username:username};
  User.findOne(query, callback);
};
userSchema.methods.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
};

userSchema.methods.getUserById = function(username, callback){
  User.findById(id, callback);
}

var User= mongoose.model('User', userSchema);

module.exports = User;
