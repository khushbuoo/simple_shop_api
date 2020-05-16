var should = require('should')
  , assert = require('assert')
  , expect = require('expect.js')
  , movement = require('../../index')

describe('movement', function(){
  describe('resource controller', function(){
    it('should have the following api', function(){
      expect(movement.controller.resource_controller('resource_name').constructor.name).to.equal("Object");
      expect(movement.controller.resource_controller('resource_name').new_resource.constructor.name).to.equal("Function");
      expect(movement.controller.resource_controller('resource_name').show_resource.constructor.name).to.equal("Function");
      expect(movement.controller.resource_controller('resource_name').list_resources.constructor.name).to.equal("Function");
      expect(movement.controller.resource_controller('resource_name').update_resource.constructor.name).to.equal("Function");
      expect(movement.controller.resource_controller('resource_name').delete_resource.constructor.name).to.equal("Function");
      expect(movement.controller.resource_controller('resource_name').edit_resource.constructor.name).to.equal("Function");
      expect(movement.controller.resource_controller('resource_name').create_resource.constructor.name).to.equal("Function");
    })
  });
});