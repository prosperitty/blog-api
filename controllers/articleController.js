const Article = require('../models/article');
const Comment = require('../models/comment');
const Category = require('../models/category');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.article_list_get = function (req, res, next) {
  Article.find({isPublished: true})
  .limit(6)
  .sort({date: -1})
  .populate('user')
  // .populate('comments')
  .exec(function(err, list_article) {
    if (err) {
      return next(err);
    }
    //success
    res.json({
      article_list: list_article,
      error: err,
    });
  })
}

exports.article_get = function (req, res, next) {
  async.parallel(
    {
      article: function (callback) {
        Article.findById(req.params.articleid)
          .populate('comments')
          .populate('user')
          .populate('category')
          .exec(callback);
      },
      comments: function (callback) {
        Comment.find({ article: req.params.articleid })
          .populate('article')
          .populate('user')
          .exec(callback);
      },
      category_list: function (callback) {
        Category.find()
        .sort({category: 'ascending'})
        .exec(callback);
      }
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.article === null) {
        let err = new Error('article not found');
        err.status = 404;
        return next(err);
      }
      res.json({
        article: results.article,
        user: req.user,
        comments: results.comments,
        category_list: results.category_list,
        error: err,
      });
    }
  );
}

exports.article_form_get = function (req, res, next) {
  Category.find()
  .sort({category: 'ascending'})
  .exec(function (err, list_categories) {
    if (err) {
      return next(err);
    }
    //success
    res.json({
      header: 'create new article',
      category_list: list_categories,
    });
  })
}

exports.article_form_post = [
  //validation and sanitization.
  body('title', 'Article title required').trim().isLength({ min: 1 }).escape(),
  body('summary', 'summary required')
    .trim()
    .isLength({ min: 1 }),
  body('content', 'content required')
    .trim()
    .isLength({ min: 1 }),

  //Process request after validation and sanitization.
  function (req, res, next) {
    const errors = validationResult(req);

    //create new article
    var article = new Article({
      user: req.user,
      title: req.body.title,
      category: req.body.category,
      summary: req.body.summary,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        fileSize: req.file.size,
        fileName: req.file.originalname,
      },
      content: req.body.content,
      isPublished: req.body.isPublished
    });

    if (!errors.isEmpty()) {
      res.json({
        article: article,
        isValid: false,
        errors: errors.array(),
      });
      return;
    } else {
      //data is valid
      article.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        console.log('New Article ' + article);
        res.json({
          isValid: true,
          article: false,
          blogURL: article.url,
        });
      });
    }
  },
];

exports.article_update = [
  //validation and sanitization.
  body('title', 'Article title required').trim().isLength({ min: 1 }).escape(),
  body('summary', 'summary required')
    .trim()
    .isLength({ min: 1 }),
  body('content', 'content required')
    .trim()
    .isLength({ min: 1 }),

  //Process request after validation and sanitization.
  function (req, res, next) {
    const errors = validationResult(req);

    var article = new Article({
      _id: req.params.articleid,
      user: req.user,
      title: req.body.title,
      category: req.body.category,
      summary: req.body.summary,
      // image: {
      //   data: req.file.buffer,
      //   contentType: req.file.mimetype,
      //   fileSize: req.file.size,
      //   fileName: req.file.originalname,
      // },
      content: req.body.content,
      isPublished: req.body.isPublished
    });

    if (!errors.isEmpty()) {
      return next(err);
    } else {
      //data is valid
      Article.findByIdAndUpdate(req.params.articleid, article, {}, function (err, thearticle) {
        if (err) {
          return next(err);
        }
        //success
        res.json({message: 'update successful!'});
      });
    }
  },
]

exports.article_delete = function (req,res, next) {

  async.parallel(
    {
      article: function (callback) {
        Article.findById(req.params.articleid)
          .exec(callback);
      },
      article_comments: function (callback) {
        Comment.deleteMany({ article: req.params.articleid })
        .exec(callback);
      },
    },
    function (err, results) {
      console.log(results.article_comments)
      if (err) {
        return next(err);
      } else {
        Article.findByIdAndRemove(req.params.articleid, function (err) {
          if (err) {
            return next(err);
          }
          console.log('deleted article successfully')
          res.json({message: `Article deleted ${req.params.articleid}`});
        });
      }
    }
  );
}