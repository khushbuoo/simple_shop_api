var movement = require('./lib/index');
var controller = require('./lib/controller')
var model = require('./lib/model')
var view = require('./lib/view')
var winston = require('winston')
var logger = {}
var util = require('util')

logger.info = function(message) {
  winston.info(message)
};

// winston

exports.resourceify = function(resources, resource) {
  var keys = [];
  for(var k in resource) keys.push(k);
    var model_name = keys[0]
    var resource_name = model_name+"s";

  resources.push(response({model: model_name, method: 'get', path: '/'+resource_name+'/new', controller: resource_name, action: 'new_resource'}))
  resources.push(response({model: model_name, method: 'post', path: '/'+resource_name, controller: resource_name, action: 'create_resource'}))
  resources.push(response({model: model_name, method: 'put', path: '/'+resource_name+"/:id", controller: resource_name, action: 'update_resource'}))
  resources.push(response({model: model_name, method: 'delete', path: '/'+resource_name+"/:id", controller: resource_name, action: 'delete_resource'}))
  resources.push(response({model: model_name, method: 'get', path: '/'+resource_name+"/:id", controller: resource_name, action: 'show_resource'}))
  resources.push(response({model: model_name, method: 'get', path: '/'+resource_name, controller: resource_name, action: 'list_resources'}))
  resources.push(response({model: model_name, method: 'get', path: '/'+resource_name+"/:id/edit", controller: resource_name, action: 'edit_resource'}))
  return resources;
};

// console.log(data)

var response = function(route) {

  var table_name = route.model + "s"


  if (route['action'] == 'new_resource') {
    route['response'] = function(req, res){
      // console.log(route)
      res.send('Default page new '+route.model+' resource.');
    }
  }

  if (route['action'] == 'create_resource') {
    route['response'] = function(req, res){
      // console.log(route)
      res.send('Default page create '+route.model+' resource.');
    }
  }

  if (route['action'] == 'update_resource') {
    route['response'] = function(req, res){
      // console.log(route)
      res.send('Default page update '+route.model+' resource');
    }
  }

  if (route['action'] == 'delete_resource') {
    route['response'] = function(req, res){
      // console.log(route)
      res.send('Default page delete '+route.model+' resource.');
    }
  }

  if (route['action'] == 'show_resource') {
    route['response'] = function(req, res){
      // console.log(route)
      res.send('Default page of show '+route.model+' resource');
    }
  }

  if (route['action'] == 'list_resources') {

    route['response'] = function(req, res) {
      res.send('Default page of list '+route.model+' resource');
    }
  }

  if (route['action'] == 'edit_resource') {
    route['response'] = function(req, res){
      // console.log(route)
      res.send('Default page of edit '+route.model+' resource');
    }
  }

  return route;
}

function isFunctionA(object) {
 return object && getClass.call(object) == '[object Function]';
}

var respond_to_request = function(app, env, route) {
  // console.log(route)
  var controller = env['controllers'][route.controller];
  if (controller == undefined) {
    env['controllers'][route.controller] = {}
    action = env['controllers'][route.controller][route.action]

  }
  // console.log(env)

  var func = env['controllers'][route.controller][route.action]
  // console.log(func.toString())
  if (func == undefined) { func = response(route)['response'] }

  app[route.method](route.path, func)
  return app;
}

start_app = function(app, env, callback) {
  // console.log(env)

  var routes = env['routes']['map']
    for (var r = 0; r < routes.length; r++) {
    var route = env['routes']['map'][r]
    var last = (routes.length-1) == r;

    app = respond_to_request(app, env, route)

    if (last) { 

      callback(app)
    }
  } 
}

var listen_to_port = function(app) {
  var port = Number(process.env.PORT || 3000)

  app.listen(port); 
  logger.info('-------------------------------------------------------------------')
  logger.info('Movement started on port ' + port); 
}

exports.something_broken = function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500', { error: err });
}

exports.not_found = function(req, res, next) {
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
}

exports.listen = listen_to_port;
exports.respond = respond_to_request;
exports.response = response;
exports.initialize = movement.initialize;
exports.controller = controller
exports.model = model
// exports.data = require('./lib/data')
exports.cli = require('./lib/cli')
exports.view = view

exports.start = start_app;

exports.logger = function(req, res, next){
  logger.info('%s %s', req.method, req.url);
  next();
}
// exports.env =  movement.env