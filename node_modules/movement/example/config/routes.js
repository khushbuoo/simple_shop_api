var resourceify = require(__dirname.replace('example/config', '') + '/index.js').resourceify
var resources = []

var routes  = [{method: 'get', path: '/', controller: 'home', action: 'index'},
               {method: 'get', path: '/contact', controller: 'home', action: 'contact'}]

resourceify(resources, {'invoice': []})
resourceify(resources, {'session': []})
resourceify(resources, {'user': []})
resourceify(resources, {'project': []})


exports.map = routes.concat(resources)