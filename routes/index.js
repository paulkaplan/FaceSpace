exports.index = function(req, res){
  res.render('index', { title: 'Faceit' })
};

exports.pong = function(req, res){
  res.render('pong', { title: 'Faceit - Pong' })
};