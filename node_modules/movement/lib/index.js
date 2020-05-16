var fs = require('fs');

var autoload = function(movement, type, directory, callback) {
  var libs = {}
  fs.readdir(directory, function(err, list) {
    if (list != undefined && list.length > 0) {
      var last = list.length - 1
      for (var t = 0; t < list.length; t++) {
        var name = list[t].replace('.js', '');
        libs[name] = require(directory+name)
        if (t == last) {
          callback(movement, libs)
        }
      }
    } else {
      callback(movement, libs)
    }
  });
}

var preload = function(lib) {
  try {
    var library = require(lib)
  } catch(err) {
    return {};
  }
  
  return library;
}

var set_stage = function(root, callback) {
  var revolutions = {}
  revolutions['config']      = {}
  revolutions['config']['app_settings'] = preload(root+'/config/index')
  revolutions['config']['db'] = preload(root+'/config/db')
  revolutions['routes']      = preload(root+'/config/routes')
  autoload(revolutions, 'controllers', root+"/app/controllers/", function(revolutions, libs) {
    revolutions['controllers'] = libs;
    autoload(revolutions, 'models', root+"/app/models/", function(revolutions, libs) {
      revolutions['models'] = libs
      callback(revolutions)
    })
  })
}

var initialize = function(root, callback) {
  set_stage(root, function(revolutions) {
    callback(revolutions)
  })
}

exports.initialize = initialize

