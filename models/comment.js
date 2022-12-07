const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const commentSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, default: Date.now},
    comment: {type: String, required: true},
    article: {type: Schema.Types.ObjectId, ref: 'Article', required: true},
  }, opts
);

//fix route
commentSchema
.virtual('url')
.get(function () {
  return '/blogs/' + this.article._id + '/comments/' + this._id;
});

commentSchema
.virtual('date_formatted')
.get(function () {
  const options = {
    year: "2-digit",
    month: "short", 
    day: "numeric",
  }
  return this.date.toLocaleDateString("en-US", options);
});


// commentSchema
// .virtual('formUrl')
// .get(function () {
//   return '/form/developer/' + this._id;
// });

module.exports = mongoose.model('Comment', commentSchema);