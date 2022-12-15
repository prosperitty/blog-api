var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/', userController.users_login_get);

//redirect to client side route
//check the login route on client side to see why it reroutes to server side route and try scope option
router.post(
  '/',
  passport.authenticate('local', {
    scope: ['username', 'password'],
    successRedirect: "https://alex-lvl.github.io",
    failureRedirect: "https://alex-lvl.github.io/login",
  })
);

module.exports = router;
