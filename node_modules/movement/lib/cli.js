var repl = require("repl");
var colors = require('colors');
var Actions = {};
var fs = require('fs-extra')
var lib_directory = __dirname;
var current_directory = process.cwd();
var mkdirp = require('mkdirp');
var movement = require('../index');
var jf = require('jsonfile')
var sys = require('sys')
var ejs = require('ejs')
var exec = require('child_process').exec;
var request_count = 0
var _ = require('underscore')
var request = require('request')

var app_path = {}
app_path.current = current_directory + "/"
app_path.path = function(file) {
  var p = app_path.current + file;
  console.log(p)
  return p;
}

app_path.controller = function(file) {
  var p = app_path.current+"app/controllers/"+file+".js"
  console.log(p)
  return p;
}

app_path.model = function(file) {
  var p = app_path.current+"app/models/"+file+".js";
  console.log(p)
  return p;
}

app_path.lib = function(file) {
  var path = lib_directory+"/"+file;
  return path;
}

app_path.config = function(file) {
  return app_path.current+"config/"+file;
}

var log = {}

log.info = function(message) {
  // console.log(message)
  // process.stdout.write(message + '\n');
  return true
};

log.json = function(message) {
  var json = JSON.parse(message);
  process.stdout.write(JSON.stringify(json) + '\n');
  return json;
};

function puts(error, stdout, stderr) { 
  log.info(stdout);
}

var m = {}

m.read = function(path, callback) {
  fs.readFile(path, 'utf8', function(err, data) {
    callback(data); //hello!
  })
}


m.write = function(path, content, callback) {
  fs.outputFile(path, content, function(err) {
    console.log(err); //null
    m.read(path, function(err, data) {
      callback(data) //hello!
    })
  })
}

m.copy = function(from, to, callback) {
  fs.readFile(from, 'utf8', function(err, data) {
    fs.outputFile(to, data, function(err) {
      callback(data); //
    })
  })
}

m.template = function(path, locals, callback) {
  m.read(path, function(t) {
    var tem = ejs.render(t, locals)
    log.info(tem)
    callback(tem)
  })
}

m.write_template = function(template_path, write_path, locals, callback) {
  this.write(write_path, this.template(template_path, locals), callback)
}

m.mkdir = function(path, callback) {
  if (callback == null ) {
    var callback = log.info
  }
  mkdirp(app_path.path(path), callback);
}

var generate_package_json = function(app) {
  m.copy(app_path.lib("templates/package.json"), app_path.path("package.json"), log.info);
}

var write_log = function(words_json) {
  // words = JSON.parse(words_json)
  // // console.log(words)
  // request_count = request_count + 1
  // if (request_count % 2) {
  //   console.log("   ".inverse+words.message.replace("HTTP ", '').inverse+"   ".inverse+" query: ".green+sys.inspect(words.req.query).green+", body: ".green+sys.inspect(words.req.body).green)
  // } else {
  //   console.log("   ".inverse+words.message.replace("HTTP ", '').inverse+"   ".inverse+" query: ".yellow+sys.inspect(words.req.query).yellow+", body: ".yellow+sys.inspect(words.req.body).yellow)
  // }
  console.log(words_json.cyan)
}

var generate_app_file = function(app_path) {
  m.copy(app_path.lib("templates/app.js"), app_path.path("app.js"), log.info);
}

var generate_config = function(app_path) {
  m.copy(app_path.lib("templates/config.js"), app_path.config('index.js'), log.info);
}


var generate_controller = function(app_path, name) {
  m.copy(app_path.lib("templates/controller.js"), app_path.controller(name), log.info);
}

var generate_initial_controller = function(app_path) {
  m.copy(app_path.lib("templates/controller.js"), app_path.controller('home'), log.info);
}

var generate_model = function(app_path) {
  m.copy(app_path.lib('templates/model.js'), app_path.model(name), log.info);
}

var generate_migration = function(migration_name, name) {
  m.copy(app_path.lib('templates/migration.js'), app_path.path("migrations/"+migration_name+".js"), log.info);
}

var generate_test = function(app_path) {
  m.copy(app_path.lib('templates/test.js'), app_path.path(".gitignore"), log.info);
}

var generate_routes = function(app_path) {
  m.copy(app_path.lib('templates/routes.js'), app_path.path("config/routes.js"), log.info);
}

var generate_procfile = function(app_path) {
  m.copy(app_path.lib('templates/Procfile'), app_path.path("Procfile"), log.info);
}

var generate_db_config = function(app_path) {
  m.copy(app_path.lib('templates/database.json'), app_path.path("database.json"), log.info);
}

var generate_gitignore = function(app_path) {
  m.copy(app_path.lib('templates/gitignore'), app_path.path(".gitignore"), log.info);
}


var generate_resource_controller = function(name) {
  var full_path = app_path.controller+"/app/controllers/"+name+"s.js"
  console.log(full_path)
  var copy_path = lib_directory+"/"
  console.log(copy_path)
  file.copy(app_path.lib('templates/resource.js'), full_path, function(err){
    if (err) return console.log(err);
    generate_model(current_directory, name)
    var migration_name = Date.now() + "create_" + name
    generate_migration(current_directory, migration_name)
  });
}

Actions['new'] = function(other_args) {
  console.log(other_args)
  var name = other_args.shift()
  app_path.name = name
  app_path.current = current_directory+"/"+name + "/"
  console.log(' ')
  console.log('# ********************************************************** #')
  console.log('#')
  console.log('# Generating Movement: '+name)
  console.log('#')
  console.log('# ********************************************************** #')
  console.log(' ')

  // app_path.current = current_directory+"/"+name
  // console.log(app_path)

  console.log('# Generating directories: ')
  console.log(' ')
  mkdirp(app_path.current, log.info);

  m.mkdir('app')
  m.mkdir('app/models')
  m.mkdir('app/controllers')
  m.mkdir('app/views')
  m.mkdir('config')
  m.mkdir('config/keys')
  m.mkdir('test')
  m.mkdir('logs')
  m.mkdir('migrations')
  console.log(' ')
  console.log('# Generating app files: ')
  console.log(' ')
  m.copy(app_path.lib("templates/package.json"), app_path.path("package.json"), log.info);
  m.copy(app_path.lib("templates/app.js"), app_path.path("app.js"), log.info);
  m.copy(app_path.lib("templates/config.js"), app_path.config('index.js'), log.info);
  m.copy(app_path.lib("templates/db.js"), app_path.config('db.js'), log.info);
  m.copy(app_path.lib('templates/routes.js'), app_path.path("config/routes.js"), log.info);
  m.copy(app_path.lib('templates/Procfile'), app_path.path("Procfile"), log.info);
  m.copy(app_path.lib("templates/controller.js"), app_path.controller('home'), log.info);
  m.copy(app_path.lib('templates/gitignore'), app_path.path(".gitignore"), log.info);
  m.copy(app_path.lib('templates/database.json'), app_path.path("database.json"), log.info);
  console.log(' ')
  console.log('# ********************************************************** #')
  console.log('#')
  console.log('# Movement Generated!')
  console.log('#')
  console.log('# ********************************************************** #')
  console.log(' ')
  // process.exit(0);
}

Actions['heroku'] = function(other_args) {
  var name = other_args.shift()
  console.log(' ')
  console.log('# ********************************************************** #')
  console.log('#')
  console.log('# Generating heroku app for Movement: '+name)
  console.log('#')
  console.log('# ********************************************************** #')
  console.log(' ')

  exec("git init", function(error, stdout, stderr){
    exec("heroku create "+name+" --stack cedar", function(error, stdout, stderr){
      exec("git push heroku master", function(error, stdout, stderr){ console.log('success')});
      exec("heroku ps:scale web=1", function(error, stdout, stderr){ console.log('success')});
      exec("heroku addons:add heroku-postgresql:dev", function(error, stdout, stderr){ console.log('success')});
      console.log(stdout)
      console.log(error)
      console.log(stderr)
      // process.exit(0);
    });
  });
  
}

Actions['github'] = function(other_args) {
  var username = other_args.shift()
  var name = other_args.shift()
  console.log(' ')
  console.log('# ********************************************************** #')
  console.log('#')
  console.log('# Generating github repo for Movement: '+username+'/'+name)
  console.log('#')
  console.log('# ********************************************************** #')
  console.log(' ')
  exec("git init", function(error, stdout, stderr){
    exec("git remote add origin https://github.com/"+username+"/"+name+".git", function(error, stdout, stderr){
      console.log(stdout)
      console.log(error)
      console.log(stderr)
      console.log(' ')
      console.log('# ********************************************************** #')
      console.log('#')
      console.log('# Github remote added!')
      console.log('#')
      console.log('# ********************************************************** #')
      console.log(' ')
      process.exit(0);
    });
  });
}

Actions['console'] = function(other_args) {
  console.log(app_path.current)

  movement.initialize(app_path.current, function(env) {
    var context = repl.start("> ").context;
    context.sys = require("sys");
    context.fs = fs;
    context.ejs = ejs;
    context.engine = env
    context.movement = movement;
    context.data = movement.data;
    context.model = movement.model;
    context.controller = movement.controller;
    context.view = movement.view;
    context.root_dir = app_path.current
    context.paths = app_path
    context.file = m
    context.log = log
    context.request = request
    context.u = _
    context.exec = exec
    context.exit = function() {
      process.exit(0);
    }
  })
}

Actions['db:migrate:up'] = function(other_args) {
  exec("node_modules/migrate/bin/migrate up", puts)
  
}

Actions['db:migrate:down'] = function(other_args) {
  exec("node_modules/migrate/bin/migrate down", puts)
}

Actions['db:migrate'] = function(other_args) {
  exec("node_modules/migrate/bin/migrate up", puts)
}

Actions['db:drop'] = function(other_args) {
  exec("dropdb "+db_name, puts)
}

Actions['db:create'] = function(other_args) {
  exec("createdb "+db_name, puts)
}

Actions['generate'] = function(other_args) {
  console.log('generating')
  var what = other_args.shift()
  var name = other_args.shift()
  // console.log(what)
  Actions['generate_'+what](name, other_args)
}

Actions['generate_resource'] = function(name, other_args) {
  generate_resource_controller(name)
}

Actions['generate_controller'] = function(name, other_args) {
  generate_controller(name)
}

Actions['generate_model'] = function(name, other_args) {
  generate_model(name)
}

Actions['generate_migration'] = function(name, other_args) {
  var migration_name = Date.now() + "_" + name
  generate_migration(migration_name, name)
}

Actions['generate_test'] = function(name, other_args) {
  generate_test(app_path.current, name)
}

Actions['start'] = function(other_args) {
  var logs = current_directory+'/logs/development.log';
  var command = "forever -w start app.js";
  console.log(command)
  exec(command, puts);
  
  var Tail = require('tail').Tail;
  if (process.env.NODE_ENV == 'development') {
    console.log('development logs')
    tail = new Tail(logs);
    tail.on("line", function(data) {
      write_log(data);
    });
  }
}

Actions['stop'] = function(other_args) {
  exec("forever stopall", puts);
}

Actions['file'] = {}
Actions['file']['copy'] = m.copy
Actions['file']['write'] = m.write
Actions['file']['read'] = m.read
Actions['file']['template'] = m.template
Actions['paths'] = app_path
module.exports = Actions
// exports.file = file
