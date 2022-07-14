var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    message: 'Welcome to the login route',
  });
});

router.post('/', function (req, res, next) {
  res.json({ message: 'received login POST' });
});

module.exports = router;
