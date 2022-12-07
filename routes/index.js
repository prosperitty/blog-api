var express = require('express');
var router = express.Router();
var async = require('async');
const Article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
  // Article.count().exec(function (err, count) {

  //   // Get a random entry
  //   var random = Math.floor(Math.random() * count)

  //   // Again query all users but only fetch one offset by our random #
  //   Article.findOne().skip(random).exec(
  //     function (err, result) {
  //       // Tada! random user
  //       console.log(result)
  //     })
  // })
  async.parallel({
    mainArticle: function(callback) {
        Article.countDocuments()
        .exec(function (err, count) {
          // Get a random entry
          var random = Math.floor(Math.random() * count)
          // Again query all users but only fetch one offset by our random #
          Article.findOne().skip(random).populate('user').populate('category').exec(callback)
        })
    },
    //bug after this query. get _id for categories instead of string
    businessArticle: function(callback) {
      Article.findOne({category: '63433c0bf956b9ec2934ecdc', isPublished: true})
      .populate('category')
      .exec(callback)
    },
    politicsArticle: function(callback) {
      Article.findOne({category: '633d2bd499336cb4c9381d17', isPublished: true})
      .populate('category')
      .exec(callback)
    },
    scienceArticle: function(callback) {
      Article.findOne({category: '63433c35f956b9ec2934ecf8', isPublished: true})
      .populate('category')
      .exec(callback)
    },
    healthArticle: function(callback) {
      Article.findOne({category: '63433c39f956b9ec2934ed06', isPublished: true})
      .populate('category')
      .exec(callback)
    },
    technologyArticle: function(callback) {
      Article.findOne({category: '63433c30f956b9ec2934ecea', isPublished: true})
      .populate('category')
      .exec(callback)
    },

  },
    function (err, results) {
      console.log(err)
      res.json({
        title: 'Home',
        main_article: results.mainArticle,
        business_article: results.businessArticle,
        politics_article: results.politicsArticle,
        science_article: results.scienceArticle,
        health_article: results.healthArticle,
        technology_article: results.technologyArticle,
        error: err,
      });
    }
  );
});

module.exports = router;
