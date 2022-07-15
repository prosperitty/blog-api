exports.article_list_get = function (req, res, next) {
  res.json({message: 'GET article list'});
}

exports.article_get = function (req, res, next) {
  res.json({message: 'GET article'});
}

exports.article_form_get = function (req, res, next) {
  res.json({message: 'GET article form'});
}

exports.article_form_post = function (req, res, next) {
  res.json({message: 'POST article form'});
}

exports.article_form_put = function (req,res, next) {
  res.json({message: 'PUT article form'});
}

exports.article_form_delete = function (req,res, next) {
  res.json({message: 'DELETE article form'});
}