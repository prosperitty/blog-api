const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {type: String, maxlength: 140, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, default: Date.now},
    summary: {type: String, required: true},
    image: {type: Media, required: true},
    content: {type: String, required: true},
    comment: [{type: Schema.Types.ObjectId, ref: 'Comment', required: true}],
  }
);

articleSchema
.virtual('url')
.get(function () {
  return '/blog/' + this._id;
});

// articleSchema
// .virtual('formUrl')
// .get(function () {
//   return '/form/developer/' + this._id;
// });

module.exports = mongoose.model('Article', articleSchema);
