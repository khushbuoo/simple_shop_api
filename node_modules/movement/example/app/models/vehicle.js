var movement = require(__dirname.replace('example/app/models', '')+'/index.js');
var model = movement.model
var table_name = 'vehicles'

var InstanceMethods = function(attributes) {
  var output = model.instance(attributes)
  output['resource'] = table_name
  return output;
}

var ClassMethods = function(collection) {
  var output = model.collection(collection)
  output['resource'] = table_name
  return output;
}


exports.record = InstanceMethods
exports.collection = ClassMethods