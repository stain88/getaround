var User = require('../models/user');

function usersIndex(req, res) {
  User.find(function(err, users) {
    if (err) return res.status(404).json({message: "Something went wrong"});

    return res.status(200).json({users:users});
  });
};

function usersShow(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(404).json({message: "Something went wrong"});
    res.status(200).json({user: user});
  });
};

function usersUpdate(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong"});

    if (!user) return res.status(404).json({message: "No user found"});

    user.save(function(err) {
      if (err) return res.status(500).json({message: "Something went wrong"});

      res.status(201).json({message: "User successfully updated", user: user});
    });
  });
};

function usersDelete(req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err) {
    if (err) return res.status(404).json({message: "Something went wrong"});

    res.status(200).json({message: "User has been successfully delete"});
  });
};

module.exports = {
  usersIndex: usersIndex,
  usersShow: usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
};