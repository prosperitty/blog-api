var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// article routes

app.get(
  '/users/:userId',
  cors({
    origin: 'https://example.com/users/:userId',
  }),
  (req, res) => {
    // Return the user with the specified userId
  }
);

router.get(
  '/',
  cors({ origin: 'https://alex-lvl.github.io/blogs' }),
  articleController.article_list_get
);

router.get('/create', articleController.article_form_get);

router.post(
  '/create',
  upload.single('image'),
  articleController.article_form_post
);

router.get('/:articleid', articleController.article_get);

router.put('/:articleid', articleController.article_update);

router.delete('/:articleid', articleController.article_delete);

//comments routes
router.get('/:articleid/comments', commentController.comment_list_get);

router.get('/:articleid/comments/create', commentController.comment_form_get);

router.post('/:articleid/comments/create', commentController.comment_form_post);

router.get('/:articleid/comments/:commentid', commentController.comment_get);

router.put(
  '/:articleid/comments/:commentid',
  commentController.comment_form_put
);

router.delete(
  '/:articleid/comments/:commentid',
  commentController.comment_form_delete
);

module.exports = router;
