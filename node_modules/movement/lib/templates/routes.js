var resourceify = require('movement').resourceify
var resources = []

var routes  = [{method: 'get', path: '/', controller: 'home', action: 'index'}]

// resourceify(resources, {'user': []})
// resourceify(resources, {'project': []})

exports.routes = routes 
exports.resources = resources 
exports.map = routes.concat(resources)