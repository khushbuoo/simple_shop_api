var movement = require(__dirname.replace('example/app/models', '')+'/index.js');
var model = movement.model
var table_name = 'users'

var InstanceMethods = function(attributes) {
  var output = model.instance(attributes)
  output['resource'] = table_name
  output['validations'].push({name: 'uniqueness'})
  return output;
}

var ClassMethods = function(collection) {
  var output = model.collection(collection)
  output['resource'] = table_name
  return output;
}


exports.record = InstanceMethods
exports.collection = ClassMethods
