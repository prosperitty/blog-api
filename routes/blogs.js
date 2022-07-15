var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController');

/* article routes */
router.get('/', articleController.article_list_get);

router.post('/', articleController.article_form_post);

router.get('/create', articleController.article_form_get);

router.get('/:articleid', articleController.article_get);

router.put('/:articleid', articleController.article_form_put);

router.delete('/:articleid', articleController.article_form_delete);

//comments routes
router.get('/:articleid/comments', commentController.comment_list_get);

router.post('/:articleid/comments', commentController.comment_form_post);

router.get('/:articleid/comments/create', commentController.comment_form_get);

router.get('/:articleid/comments/:commentid', commentController.comment_get);

router.put('/:articleid/comments/:commentid', commentController.comment_form_put);

router.delete('/:articleid/comments/:commentid', commentController.comment_form_delete);

module.exports = router;
