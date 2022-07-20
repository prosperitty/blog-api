var express = require('express');
var router = express.Router();
var async = require('async');
const articleController = require('../controllers/articleController');
const Article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel(
    {
      articles: function(callback) {
        Article.find({}, callback);
      }
    },
    function(err, results) {
      res.json({
        title: 'Home',
        articles: results,
        error: err,
      });
    }
  );
});

module.exports = router;
