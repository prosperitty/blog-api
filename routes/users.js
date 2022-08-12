var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

/* GET user profile. */
router.get('/profile',function(req, res, next) {
    res.json({message: 'profile route'});
});

router.get('/authenticated', userController.users_isLoggedIn);

router.get('/logout', userController.users_logout_post);

module.exports = router;