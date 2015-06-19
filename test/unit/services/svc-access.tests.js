'use strict';
describe('service: access:', function() {
  beforeEach(module('risevision.schedulesApp.services'));

  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    $provide.service('userState',function(){
      return {
        authenticate : function(){
          var deferred = Q.defer();
                  
          if (authenticate) {
            deferred.resolve("auth");
          }
          else {
            deferred.reject("not auth");
          }
          
          return deferred.promise
        },
        isRiseVisionUser : function(){
          return isRiseVisionUser;
        }, 
        _restoreState: function(){}
      }
    });
  }));
  
  var canAccessSchedules, authenticate, isRiseVisionUser;
  beforeEach(function(){
    isRiseVisionUser = true;
    authenticate = true;

    inject(function($injector){
      canAccessSchedules = $injector.get('canAccessSchedules');
    });
  });

  it('should exist',function(){
    expect(canAccessSchedules).to.be.truely;
    expect(canAccessSchedules).to.be.a('function');
  });
  
  it('should return resolve if authenticated',function(done){
    canAccessSchedules()
    .then(function(){
      done();
    })
    .then(null, function() {
      done("error");
    });
  });
  
  it('should reject if user is not Rise Vision User',function(done){
    isRiseVisionUser = false;
    authenticate = true;

    canAccessSchedules()
    .then(function() {
      done("authenticated");
    })
    .then(null, function() {
      done();
    });  
  });
  
  it('should reject if user is not authenticated',function(done){
    isRiseVisionUser = true;
    authenticate = false;

    canAccessSchedules()
    .then(function() {
      done("authenticated");
    })
    .then(null, function() {
      done();
    });  
  });

});
