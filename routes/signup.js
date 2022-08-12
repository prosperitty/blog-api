var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.users_signup_get);

router.post('/', userController.users_signup_post);

module.exports = router;
