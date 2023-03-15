var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.users_profile);

router.get('/authenticated', userController.users_isLoggedIn);

router.get('/logout', userController.users_logout_post);

router.get('/:userid', userController.users_posts)

module.exports = router;
