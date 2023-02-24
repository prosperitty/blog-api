var express = require('express');
var router = express.Router();
var async = require('async');
const Article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
  async.parallel(
    {
      mainArticle: function (callback) {
        Article.aggregate([
          { $match: { isPublished: true } },
          { $sample: { size: 1 } },
          {
            $addFields: {
              date_formatted: {
                $dateToString: { format: '%M-%d-%Y', date: '$date' },
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          {
            $unwind: '$category',
          },
          {
            $unwind: '$user',
          },
        ]).exec(callback);
      },
      //bug after this query. get _id for categories instead of string
      businessArticle: function (callback) {
        Article.findOne({
          category: '63433c0bf956b9ec2934ecdc',
          isPublished: true,
        })
          .select('-image')
          .sort({ date: -1 })
          .populate('category')
          .exec(callback);
      },
      politicsArticle: function (callback) {
        Article.findOne({
          category: '633d2bd499336cb4c9381d17',
          isPublished: true,
        })
          .select('-image')
          .sort({ date: -1 })
          .populate('category')
          .exec(callback);
      },
      scienceArticle: function (callback) {
        Article.findOne({
          category: '63433c35f956b9ec2934ecf8',
          isPublished: true,
        })
          .select('-image')
          .sort({ date: -1 })
          .populate('category')
          .exec(callback);
      },
      healthArticle: function (callback) {
        Article.findOne({
          category: '63433c39f956b9ec2934ed06',
          isPublished: true,
        })
          .select('-image')
          .sort({ date: -1 })
          .populate('category')
          .exec(callback);
      },
      technologyArticle: function (callback) {
        Article.findOne({
          category: '63433c30f956b9ec2934ecea',
          isPublished: true,
        })
          .select('-image')
          .sort({ date: -1 })
          .populate('category')
          .exec(callback);
      },
    },
    function (err, results) {
      console.log(err);
      res.json({
        title: 'Home',
        main_article: results.mainArticle[0],
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
