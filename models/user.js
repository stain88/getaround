var mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  local: {
    username: {type: String, unique: true, required: true},
    fullname: {type: String},
    image: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
  }
});

userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("Users", userSchema);