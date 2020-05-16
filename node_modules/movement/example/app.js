var movement = require(__dirname.replace('example','')+'index.js');
var initialize = movement.initialize;
var data = movement.data;
var start = movement.start;
var listen = movement.listen;
var express = require('express');
var fs = require('fs');
var app = express();
var logFile = fs.createWriteStream('./logs/development.log', {flags: 'a'})

app.configure(function(){
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.set('views', __dirname + '/app/views/');
  app.set('view engine', 'ejs');
  app.use(express.logger({stream: logFile}));
  app.use(app.router);
  app.use(movement.not_found);
  app.use(movement.something_broken);
});

initialize(__dirname, function(e) {
  start(app, e, function(app) {
    listen(app)
  }) 
})

