const Comment = require('../models/comment');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.comment_list_get = function (req, res, next) {
  res.json({message: 'GET comment list'});
}

exports.comment_get = function (req, res, next) {
  res.json({message: 'GET comment'});
}

exports.comment_form_get = function (req, res, next) {
  res.json({header: 'Create new comment'});
}

exports.comment_form_post = [
  //validation and sanitization.
  body('comment', 'comment required')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  //Process request after validation and sanitization.
  function (req, res, next) {
    const errors = validationResult(req);

    //create new Developer
    var comment = new Comment({
      comment: req.body.comment,
      user: req.user,
      article: req.params.articleid,
    });

    if (!errors.isEmpty()) {
      res.json({
        comment: comment,
        errors: errors.array(),
      });
      return;
    } else {
      //data is valid
      comment.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        console.log('New Comment ' + comment);
        res.redirect('/blogs/' + comment.article._id);
      });
    }
  },
];

exports.comment_form_put = function (req,res, next) {
  res.json({message: 'PUT comment form'});
}

exports.comment_form_delete = function (req,res, next) {
  res.json({message: 'DELETE comment form'});
}