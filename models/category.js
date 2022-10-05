const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };
const categorySchema = new Schema(
  {
    category: {type: String, required: true, maxlength:20, minlength:2},
  }, opts
)

categorySchema
.virtual('url')
.get(function () {
  return '/category/' + this._id;
});

// categorySchema
// .virtual('formUrl')
// .get(function () {
//   return '/form/genre/' + this._id;
// });

module.exports = mongoose.model('Category', categorySchema);
