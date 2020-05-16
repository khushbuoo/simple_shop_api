var should = require('should')
  , assert = require('assert')
  , expect = require('expect.js')
  , movement = require('../index')

describe('movement', function(){
  describe('cli', function(){
    it('should have the following api', function(){
      expect(movement.cli.constructor.name).to.equal("Object");
      expect(movement.cli.new.constructor.name).to.equal("Function");
      expect(movement.cli.console.constructor.name).to.equal("Function");
      expect(movement.cli['db:migrate:up'].constructor.name).to.equal("Function");
      expect(movement.cli['db:migrate:down'].constructor.name).to.equal("Function");
      expect(movement.cli['db:migrate'].constructor.name).to.equal("Function");
      expect(movement.cli['db:drop'].constructor.name).to.equal("Function");
      expect(movement.cli['db:create'].constructor.name).to.equal("Function");
      expect(movement.cli.generate.constructor.name).to.equal("Function");
      expect(movement.cli.generate_resource.constructor.name).to.equal("Function");
      expect(movement.cli.generate_controller.constructor.name).to.equal("Function");
      expect(movement.cli.generate_model.constructor.name).to.equal("Function");
      expect(movement.cli.generate_migration.constructor.name).to.equal("Function");
      expect(movement.cli.generate_test.constructor.name).to.equal("Function");
      expect(movement.cli.start.constructor.name).to.equal("Function");
    })
  });
});
