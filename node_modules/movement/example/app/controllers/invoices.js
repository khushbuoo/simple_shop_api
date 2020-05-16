var controller = require('movement').controller;
var resource = {name: 'invoices', table_name: 'invoices', model: 'invoice'}

exports.new_resource = function(req, res) {
  controller.resource_controller(resource).new_resource(req, res)
}
exports.show_resource = function(req, res) {
  controller.resource_controller(resource).show_resource(req, res)
}
exports.list_resources = function(req, res) {
  controller.resource_controller(resource).list_resources(req, res)
}
exports.edit_resource = function(req, res) {
  controller.resource_controller(resource).edit_resource(req, res)
}
exports.create_resource = function(req, res) {
  controller.resource_controller(resource).create_resource(req, res)
}
exports.update_resource = function(req, res) {
  controller.resource_controller(resource).update_resource(req, res)
}
exports.delete_resource = function(req, res) {
  controller.resource_controller(resource).delete_resource(req, res)
}