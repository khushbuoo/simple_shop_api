var movement = require(__dirname.replace('example','')+'index.js');
var initialize = movement.initialize;
var data = movement.data;
var start = movement.start;
var listen = movement.listen;
var express = require('express');
var app = express();


app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.set('views', __dirname + '/app/views/');
  app.set('view engine', 'ejs');
  app.use(app.router);

  app.use(function(req, res, next) {
    res.status(404);
    if (req.format('html')) {
      res.render('404', { url: req.url });
      return;
    }
    if (req.format('json')) {
      res.send({ error: 'Not found' });
      return;
    }
    res.type('txt').send('Not found');
  })
  app.use(movement.something_broken);
});


initialize(__dirname, function(e) {
  start(app, e, function(app) {
    listen(app)
  }) 
})

