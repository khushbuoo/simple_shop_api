var _ = require('underscore')

var criteria = function(input) {
  var output = {}
  output['type'] = 'Criteria'
  output['query'] = input

  return output;
}

var where = function(input) {
  this['query'] = {}
  this.query.conditions = {}
  this['query']['conditions']['unassigned_key'] = input
  return this;
}

var and = function(input) {
  this['query']['conditions']['unassigned_key'] = input
  return this;
}

var not = function(input) {
  this['query']['conditions']['unassigned_key'] = input
  return this;
}

var equals = function(input) {
  this['query']['conditions'][this['query']['conditions']['unassigned_key']] = input
  delete this['query']['conditions']['unassigned_key']
  return this;
}

var gt = function(input) {
  this['query']['conditions'][this['query']['conditions']['unassigned_key']] = {gt: input}
  delete this['query']['conditions']['unassigned_key']
  return this;
}

var lt = function(input) {
  this['query']['conditions'][this['query']['conditions']['unassigned_key']] = {lt: input}
  delete this['query']['conditions']['unassigned_key']
  return this;
}


var all = function(input) {
  this.query['collection_scope'] = 'all'
  return this;
}

var first = function(input) {
  this.query['collection_scope'] = 'first'
  return this;
}

var last = function(input) {
  this.query['collection_scope'] = 'last'
  return this;
}

var limit = function(input) {
  this.query['limit'] = input
  return this;
}

var order = function(input) {
  this.query['order'] = input
  return this;
}

var order = function(input) {
  this.query['order'] = input
  return this;
}

var select = function(input) {
  this.query['select'] = input
  return this;
}

var join = function(input) {
  this.query['join'] = input
  return this;
}

var skip = function(input) {
  this.query['skip'] = input
  return this;
}

var near = function(coordinates) {
  this.query['near'] = coordinates
  return this;
}

var find = function(input) {
  where(input).first()
  return this;
}

var count = function(input) {
  this.query['count'] = input
  return this;
}

var sort = function(input) {
  this.query['sort'] = input
  return this;
}

var perform = function(input) {
  this.query['text'] = this.write_query(this)
  return this.query['text'];
}


var write_query = function(input) {
  // console.log('writing some awesome sql')
  // console.log(this.query)
  return _.extend({}, this.query);
}

exports.criteria = criteria;
exports.where = where;
exports.and = and;
exports.not = not;
exports.all = all;
exports.near = near;
exports.first = first;
exports.last = last;
exports.limit = limit;
exports.order = order;
exports.skip = skip;
exports.select = select;
exports.join = join;
exports.find = find;
exports.gt = gt;
exports.lt = lt;
exports.sort = sort;
exports.count = count;
exports.equals = equals;
exports.write_query = write_query;
exports.perform = perform;