var express = require('express');
var router = express.Router();
const Users = require('../models/user');
const async = require('async');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    message: 'Welcome to the signup route',
  });
});

router.post('/', function (req, res, next) {
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
      res.redirect('/users/log-in');
    });
  });
});

module.exports = router;
