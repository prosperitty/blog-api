exports.comment_list_get = function (req, res, next) {
  res.json({message: 'GET comment list'});
}

exports.comment_get = function (req, res, next) {
  res.json({message: 'GET comment'});
}

exports.comment_form_get = function (req, res, next) {
  res.json({message: 'GET comment form'});
}

exports.comment_form_post = function (req, res, next) {
  res.json({message: 'POST comment form'});
}

exports.comment_form_put = function (req,res, next) {
  res.json({message: 'PUT comment form'});
}

exports.comment_form_delete = function (req,res, next) {
  res.json({message: 'DELETE comment form'});
}