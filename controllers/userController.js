const User = require('../models/user');
const Article = require('../models/article');
var async = require('async');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.users_signup_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.json({ title: 'sign up', isValid: false });
  } else {
    res.json({ isLoggedIn: req.isAuthenticated() });
  }
};

exports.users_signup_post = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    })
      if (err) {
        return next(err);
      } else {
        User.findOne({username: req.body.username}).exec(function(err, found_username) {
          if (err) {
            return next(err);
          }
          if (found_username) {
            // username exists, redirect to signup page.
            res.json({
              message: 'username is taken. try another username',
              isValid: false,
            })
            // res.redirect('https://alex-lvl.github.io/blog-react/signup');
          } else {
            user.save(function (err) {
              if (err) {
                return next(err);
              }
              // user saved. Redirect to login.
              res.json({
                message: 'success!',
                isValid: true,
              })
              // res.redirect('https://alex-lvl.github.io/blog-react/login');
            });
          }
        })
      }
  });
};

exports.users_login_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    console.log('not auth get req', )
    res.json({ title: 'log in', isLoggedIn: false});
  } else {
    console.log('is auth get req')
    res.json({ isLoggedIn: req.isAuthenticated() });
  }
};

exports.users_logout_post = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json({ isLoggedIn: req.isAuthenticated(), statusCode: res.statusCode });
  });
};

exports.users_isLoggedIn = function (req, res, next) {
  console.log(req.isAuthenticated(),'logged in?');
  return res.json({ isAuthenticated: req.isAuthenticated() });
};

exports.users_posts = function (req, res, next) {
  Article.find({ user: req.params.userid, isPublished: true })
  .select('-image')
  .select('-comments')
  .populate('category')
  .populate('user', 'firstName lastName')
  .sort({date: -1})
  .exec(function (err, results) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json({
      user_posts: results,
      error: err,
    });
  });
};

exports.users_profile = function (req, res, next) {
  async.parallel(
    {
      published_articles: function (callback) {
        Article.find({ user: req.user._id, isPublished: true })
          .select('-image')
          .populate('comments')
          .populate('category')
          .populate('user')
          .exec(callback);
      },
      unpublished_articles: function (callback) {
        Article.find({ user: req.user._id, isPublished: false })
          .select('-image')
          .populate('comments')
          .populate('category')
          .populate('user')
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
};


