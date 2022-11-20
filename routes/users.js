var express = require('express');
var router = express.Router();
var async = require('async');
const Article = require('../models/article');
const userController = require('../controllers/userController');

router.get('/profile', function (req, res, next) {
  async.parallel(
    {
      published_articles: function (callback) {
        Article.find({ user: req.user._id, isPublished: true })
          .populate('comments')
          .populate('category')
          .exec(callback);
      },
      unpublished_articles: function (callback) {
        Article.find({ user: req.user._id, isPublished: false })
          .populate('comments')
          .populate('category')
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        console.log(err);
        return next(err);
      }
      console.log(req.user);
      res.json({
        unpublished_articles: results.unpublished_articles,
        published_articles: results.published_articles,
        user: req.user,
        error: err,
      });
    }
  );

  // res.json({message: 'profile route'});
});

router.get('/authenticated', userController.users_isLoggedIn);

router.get('/logout', userController.users_logout_post);

module.exports = router;
