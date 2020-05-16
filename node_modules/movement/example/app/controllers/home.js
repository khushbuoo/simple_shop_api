exports.index = function(req, res){
  res.render('home/index', {title: 'hello cruel world'});
}

exports.contact = function(req, res){
  res.send('hello contact');
}
