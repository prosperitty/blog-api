const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, default: Date.now},
    comment: {type: String, required: true},
    article: {type: Schema.Types.ObjectId, ref: 'Article', required: true},
  }
);

//fix route
commentSchema
.virtual('url')
.get(function () {
  return '/blog/comments' + this._id;
});

// commentSchema
// .virtual('formUrl')
// .get(function () {
//   return '/form/developer/' + this._id;
// });

module.exports = mongoose.model('Comment', commentSchema);