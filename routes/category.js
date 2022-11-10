var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController');

/* category routes */

router.get('/', categoryController.latest_list);

router.get('/create', categoryController.category_form_get);

router.post('/create', categoryController.category_form_post);

router.get('/:categoryid', categoryController.category_list);

router.put('/:categoryid', categoryController.category_update);

router.delete('/:categoryid', categoryController.category_delete);

module.exports = router;
