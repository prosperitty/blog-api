const Category = require('../models/category');
const Article = require('../models/article');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.latest_list = function (req, res, next) {

  async.parallel(
    {
      category_list: function (callback) {
        Category.find()
        .sort({category: 'ascending'})
        .exec(callback);
      },
      list_latest: function (callback) {
        Article.find({isPublished: true})
        .sort({date: -1})
        .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      //success
      res.json({
        category_list: results.category_list,
        latest_list: results.list_latest,
        error: err,
      });
    }
  );
};

//Display detail specific Developer
exports.category_list = function (req, res, next) {

  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.categoryid).exec(callback);
      },
      category_articles: function (callback) {
        Article.find({ category: req.params.categoryid, isPublished: true }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category === null) {
        let err = new Error('Category not found');
        err.status = 404;
        return next(err);
      }
      //success
      res.json({
        title: 'Category Detail',
        category: results.category,
        category_list: results.category_articles,
        error: err,
      });
    }
  );
};

exports.category_form_get = function (req, res) {
  res.json({ title: 'Create New Category' });
};

exports.category_form_post = [
  // Validate and sanitize the name field.
  body('category', 'Category name required').trim().isLength({ min: 2 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    var category = new Category({
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.json({
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Category.findOne({ category: req.body.category }).exec(function (err, found_category) {
        if (err) {
          return next(err);
        }

        if (found_category) {
          // Category exists, redirect to its detail page.
          res.redirect(category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to category detail page.
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

//SUCCESS. CREATE LOGIC
exports.category_delete = function (req, res, next) {
  console.log(`this is a delete request for ${req.params.categoryid}`);
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.categoryid).exec(callback);
      },
      category_articles: function (callback) {
        Article.find({ category: req.params.categoryid }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category_articles.length > 0) {
        //success
        res.json({
          title: 'Delete Category',
          category: results.category,
          category_articles: results.category_articles,
        });
        return;
      } else {
        Category.findByIdAndRemove(req.params.categoryid, function (err) {
          if (err) {
            return next(err);
          }
          console.log(`${req.params.categoryid} successfully deleted`)
          //success
          res.json({
            statusCode: 'success'
          });
        });
      }
    }
  );
};

exports.category_update = [
  // Validate and sanitize the name field.
  body('category', 'Category name required').trim().isLength({ min: 2 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a category object with escaped and trimmed data.
    var category = new Category({
      _id: req.params.categoryid,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      console.log('error occured update again', errors.array())
      res.json({
        title: 'Update Category',
        category: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Category.findOne({ category: req.body.category }).exec(function (err, found_category) {
        if (err) {
          return next(err);
        }
        if (found_category) {
          // Category exists, redirect to its detail page.
          res.redirect(found_category.url);
        } else {
          console.log('update successful', req.body)
          Category.findByIdAndUpdate(
            req.params.categoryid,
            category,
            {},
            function (err, thecategory) {
              if (err) {
                return next(err);
              }
              // Category saved. Redirect to category detail page.
              res.json({message: 'update successful!'});
            }
          );
        }
      });
    }
  },
];
