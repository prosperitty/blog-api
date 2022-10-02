const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    category: {type: String, required: true, maxlength:100, minlength:2},
  }
)

CategorySchema
.virtual('url')
.get(function () {
  return '/blogs/category/' + this._id;
});

// CategorySchema
// .virtual('formUrl')
// .get(function () {
//   return '/form/genre/' + this._id;
// });

module.exports = mongoose.model('Category', CategorySchema);
