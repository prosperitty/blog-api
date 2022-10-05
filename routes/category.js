var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');

/* category routes */

router.get('/', categoryController.latest_list);

router.get('/create', categoryController.category_form_get);

router.post('/create', categoryController.category_form_post);

router.get('/:categoryid', categoryController.category_list);

// router.put('/category/:categoryid', categoryController.category_form_put);

// router.delete('/category/:categoryid', categoryController.category_form_delete);

module.exports = router;
