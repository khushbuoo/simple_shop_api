var should = require('should')
  , assert = require('assert')
  , expect = require('expect.js')
  , movement = require('../index')

describe('movement', function(){
  describe('object', function(){
    it('should follow this api', function(){
        expect(movement.start.constructor.name).to.equal("Function");
        expect(movement.initialize.constructor.name).to.equal("Function");
        expect(movement.listen.constructor.name).to.equal("Function");
        expect(movement.respond.constructor.name).to.equal("Function");
        expect(movement.response.constructor.name).to.equal("Function");
        // expect(movement.data.constructor.name).to.equal("Object");
        expect(movement.model.constructor.name).to.equal("Object");
        expect(movement.controller.constructor.name).to.equal("Object");
        expect(movement.view.constructor.name).to.equal("Object");
    })
  })

  describe('model', function(){
    it('should have the following api', function(){
      expect(movement.model.constructor.name).to.equal("Object");
      expect(movement.model.instance.constructor.name).to.equal("Function");
      expect(movement.model.collection.constructor.name).to.equal("Function");
      expect(movement.model.finder.constructor.name).to.equal("Object");
      expect(movement.model.finder.criteria.constructor.name).to.equal("Function");
      expect(movement.model.finder.where.constructor.name).to.equal("Function");
      expect(movement.model.finder.and.constructor.name).to.equal("Function");
      expect(movement.model.finder.not.constructor.name).to.equal("Function");
      expect(movement.model.finder.all.constructor.name).to.equal("Function");
      expect(movement.model.finder.near.constructor.name).to.equal("Function");
      expect(movement.model.finder.first.constructor.name).to.equal("Function");
      expect(movement.model.finder.last.constructor.name).to.equal("Function");
      expect(movement.model.finder.limit.constructor.name).to.equal("Function");
      expect(movement.model.finder.order.constructor.name).to.equal("Function");
      expect(movement.model.finder.select.constructor.name).to.equal("Function");
      expect(movement.model.finder.skip.constructor.name).to.equal("Function");
      expect(movement.model.finder.join.constructor.name).to.equal("Function");
      expect(movement.model.finder.find.constructor.name).to.equal("Function");
      expect(movement.model.finder.gt.constructor.name).to.equal("Function");
      expect(movement.model.finder.lt.constructor.name).to.equal("Function");
      expect(movement.model.finder.sort.constructor.name).to.equal("Function");
      expect(movement.model.finder.count.constructor.name).to.equal("Function");
      expect(movement.model.finder.equals.constructor.name).to.equal("Function");
      expect(movement.model.finder.write_query.constructor.name).to.equal("Function");
      expect(movement.model.finder.perform.constructor.name).to.equal("Function");
    })
  })

  describe('controller', function(){
    it('should have the following api', function(){
      expect(movement.controller.resource_controller.constructor.name).to.equal("Function");
      expect(movement.controller.session_controller.constructor.name).to.equal("Function");
      expect(movement.controller.passwords_controller.constructor.name).to.equal("Function");
      expect(movement.controller.registration_controller.constructor.name).to.equal("Function");
      expect(movement.controller.email_verification_controller.constructor.name).to.equal("Function");
      expect(movement.controller.two_factor_authentication_controller.constructor.name).to.equal("Function");
      expect(movement.controller.sms_verification_controller.constructor.name).to.equal("Function");
      expect(movement.controller.blog_controller.constructor.name).to.equal("Function");
      expect(movement.controller.oauth_applications_controller.constructor.name).to.equal("Function");
      expect(movement.controller.oauth2_controller.constructor.name).to.equal("Function");
      expect(movement.controller.resource_api_controller.constructor.name).to.equal("Function");
      expect(movement.controller.job_board_controller.constructor.name).to.equal("Function");
      expect(movement.controller.cart_controller.constructor.name).to.equal("Function");
      expect(movement.controller.checkout_controller.constructor.name).to.equal("Function");
      expect(movement.controller.admin_controller.constructor.name).to.equal("Function");
    })
  })
});