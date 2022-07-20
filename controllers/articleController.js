const Article = require('../models/article');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.article_list_get = function (req, res, next) {
  res.json({message: 'GET article list'});
}

exports.article_get = function (req, res, next) {
  res.json({message: 'GET article'});
}

exports.article_form_get = function (req, res, next) {
  res.json({
    header: 'create new article'
  });
}

exports.article_form_post = [
  //validation and sanitization.
  body('title', 'Article title required').trim().isLength({ min: 1 }).escape(),
  body('summary', 'summary required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'content required')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //Process request after validation and sanitization.
  function (req, res, next) {
    const errors = validationResult(req);

    //create new Developer
    var article = new Article({
      title: req.body.title,
      summary: req.body.summary,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        fileSize: req.file.size,
        fileName: req.file.originalname,
      },
      content: req.body.content,
    });

    if (!errors.isEmpty()) {
      res.json({
        article: article,
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
        res.redirect('/blogs');
      });
    }
  },
];

exports.article_form_put = function (req,res, next) {
  res.json({message: 'PUT article form'});
}

exports.article_form_delete = function (req,res, next) {
  res.json({message: 'DELETE article form'});
}