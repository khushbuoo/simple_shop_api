var model = {}
var finder = require('./finder');

var log = {}

log.info = function(message) {
  process.stdout.write(message + '\n');
};

log.json = function(message) {
  var json = JSON.parse(message);
  process.stdout.write(JSON.stringify(json) + '\n');
  return json;
};


var Instance = function(attributes) {
  var row = {}

  row['changes'] = {}
  if (attributes == null) {
    row['data'] = {}
  } else {
    row['data'] = attributes
  }
  

  row['validations'] = []
  row['errors'] = []

  row['before_create'] = function() {
    log.info('before_create')
  }

  row['after_create'] = function() {
    log.info('after_create')
  }

  row['before_save'] = function() {
    log.info('before_save')
  }

  row['after_save'] = function() {
    log.info('after_save')
  }

  row['before_update'] = function() {
    log.info('before_update')
  }

  row['after_update'] = function() {
    log.info('after_update')
  }

  row['save'] = function() {
    logger.info(this)
    this['before_save']()
    this['data'] = this['changes']
    this['changes'] = {}
    log.info('save')
    this['after_save']()
    return this;
  }

  row['create'] = function(a) {
    this['changes'] = a;
    this['before_update']()
    this['save']()
    this['after_update']()
    return this;
  }

  row['update'] = function(a) {
    this['changes'] = a;
    this['before_update']()
    this['save']()
    this['after_update']()
    return this;
  }

  row['update_attributes'] = function(a) {
    this['before_update']()
    this['changes'] = a;
    this['data'] = this['changes'];
    this['changes'] = {}
    // this['save']()
    this['after_update']()
    // this['update']()
    return this;
  }
  return row;
}

var ClassMethods = function(input) {
  collection = {}

  if (input == null) {
    collection['results'] = []
  } else {
    collection['results'] = input
  }

  collection['model'] = function(model_name) {
    // this.model = model_name;
    this.table_name = model_name+'s'
  }

  collection['last'] = function() {
    return this.results[this.results.length-1];
  }

  collection['all'] = function() {
    return this.results[0];
  }

  collection['where'] = function(conditions) {
    return this.results[0];
  }

  collection['limit'] = function(limit) {
    return this.results;
  }

  collection['order'] = function(limit) {
    return this.results;
  }

  collection['skip'] = function(limit) {
    return this.results;
  }

  collection['find'] = function(id) {
    return this.results[0];
  }

  collection['first'] = function() {
    return this.results[0];
  }

  collection['count'] = function() {
    return this.length;
  }

  return collection;
}

// exports.schema = model
exports.instance = Instance
exports.collection = ClassMethods
exports.finder = finder