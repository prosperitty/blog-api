var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/', userController.users_login_get);

//redirect to client side route
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: 'https://alex-lvl.github.io/blog-react/',
    failureRedirect: 'https://alex-lvl.github.io/blog-react/login',
  })
);

module.exports = router;
