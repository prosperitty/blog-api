const Category = require('../models/category');
const Article = require('../models/article');
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.category_list = function (req, res, next) {
  res.send('NOT IMPLEMENTED: category LIST');
};

exports.category_locals = function (req, res, next) {
  let errors;
  let category;
  res.locals.category = category;
  res.locals.errors = errors;
  next();
};

//Display detail specific Developer
exports.category_detail = function (req, res, next) {
  // res.send('NOT IMPLEMENTED: category detail page')

  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_articles: function (callback) {
        Article.find({ category: req.params.id }, 'title description').exec(callback);
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
        category_articles: results.category_articles,
      });
    }
  );
};

exports.category_create_get = function (req, res) {
  res.json({ title: 'Create New Category' });
};

exports.category_create_post = [
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
          res.redirect(found_category.url);
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

exports.category_delete_get = function (req, res, next) {
  // res.send('NOT IMPLEMENTED: get delete category');

  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_articles: function (callback) {
        Article.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category === null) {
        res.redirect('/blogs');
      }
      //success
      res.json({
        title: 'Delete Category',
        category: results.category,
        category_articles: results.category_articles,
      });
    }
  );
};

exports.category_delete_post = function (req, res, next) {
  // res.send('NOT IMPLEMENTED: post delete category');

  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.body.categoryid).exec(callback);
      },
      category_articles: function (callback) {
        Article.find({ category: req.body.categoryid }).exec(callback);
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
        Category.findByIdAndRemove(req.body.categoryid, function (err) {
          if (err) {
            return next(err);
          }
          //success
          res.redirect('/blogs');
        });
      }
    }
  );

  // Category.findById(req.params.id).exec(function (err, category) {
  //   if (err) {
  //     return next(err);
  //   }

  //   //success
  //   Category.findByIdAndRemove(req.body.categoryid, function (err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     //success
  //     res.redirect('/blogs');
  //   });
  // });
};

exports.category_update_get = function (req, res, next) {
  // res.send('NOT IMPLEMENTED: get update category');

  Category.findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }
    if (category === null) {
      let err = new Error('category not found');
      err.status = 404;
      return next(err);
    }
    res.json({
      title: 'Update New Category',
      category: category,
    });
  });
};

exports.category_update_post = [
  // Validate and sanitize the name field.
  body('category', 'Category name required').trim().isLength({ min: 2 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    var category = new Category({
      _id: req.params.id,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
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
          Category.findByIdAndUpdate(
            req.params.id,
            category,
            {},
            function (err, thecategory) {
              if (err) {
                return next(err);
              }
              // Category saved. Redirect to category detail page.
              res.redirect(thecategory.url);
            }
          );
        }
      });
    }
  },
];
