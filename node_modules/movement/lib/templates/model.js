var movement = require('movement');
var model = movement.model
var table_name = 'users'

var Sequelize = require("sequelize")

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

var emptyCollection = ClassMethods();

exports.record = InstanceMethods
exports.collection = ClassMethodsdels
