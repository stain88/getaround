var passport  = require('passport'),
    User      = require('../models/user'),
    secret    = require('../config/config').secret,
    jwt       = require('jsonwebtoken');

function register(req, res, next) {
  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).json({message: "Something went wrong"});

    if (info) return res.status(401).json({message: info.message});

    if (!user) return res.status(401).json({message: "User already exists"});

    var token = jwt.sign(user, secret, {expiresIn: 60*60*24});

    return res.status(200).json({
      success: true,
      message: "Thank you for signing up",
      token: token,
      user: user
    });
  });

  return localStrategy(req, res, next);
};

function login(req, res, next) {
  User.findOne({
    "local.email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);

    if (!user || !user.validPassword(req.body.password)) return res.status(403).json({message: "Incorrect credentials"});

    var token = jwt.sign(user, secret, {expiresIn:60*60*24});

    return res.status(200).json({
      success: true,
      message: "Welcome back",
      token: token,
      user: user
    });
  });
};

module.exports = {
  login: login,
  register: register
};