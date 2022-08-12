const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.users_signup_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.json({ title: 'sign up' });
  } else {
    res.json({isLoggedIn: req.isAuthenticated()});
  }
};

exports.users_signup_post = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  });
};

exports.users_login_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.json({ title: 'log in', user: undefined });
  } else {
    res.json({isLoggedIn: req.isAuthenticated()})
  }
};

exports.users_logout_post = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.users_isLoggedIn = function (req, res, next) {
  return res.json({isAuthenticated: req.isAuthenticated()});
}