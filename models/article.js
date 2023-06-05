const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
//add published field which takes a boolean value to do unpublished or published posts
const articleSchema = new Schema(
  {
    title: {type: String, maxlength: 140, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, default: Date.now},
    summary: {type: String, required: true},
    // image: {data: Buffer, contentType: String, fileName: String, fileSize: String},
    image: {secure_url: String, public_id: String},
    content: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment', required: true}],
    isPublished: {type: Boolean, required: true}
  }, opts
);

articleSchema
.virtual('url')
.get(function () {
  return '/blogs/' + this._id;
});

articleSchema
.virtual('date_formatted')
.get(function () {
  const options = {
    year: "numeric",
    month: "long", 
    day: "numeric",
  }
  return this.date.toLocaleDateString("en-US", options);
});

// articleSchema
// .virtual('formUrl')
// .get(function () {
//   return '/form/developer/' + this._id;
// });

module.exports = mongoose.model('Article', articleSchema);
