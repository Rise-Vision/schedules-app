'use strict';
describe('controller: schedule details', function() {
  var scheduleId = 1234;
  beforeEach(module('risevision.schedulesApp.controllers'));
  beforeEach(module('risevision.schedulesApp.services'));
  beforeEach(module(mockTranlate()));
  beforeEach(module(function ($provide) {
    $provide.service('scheduleFactory',function(){
      return {
        schedule: {},
        updateSchedule : function(){
          updateCalled = true;
          
          return Q.resolve();
        },
        deleteSchedule: function() {
          deleteCalled = true;
        }
      }
    });
    $provide.service('$state',function(){
      return {
        _state : '',
        go : function(state, params){
          if (state){
            this._state = state;
          }
          return this._state;
        }
      }
    });
    $provide.service('$modal',function(){
      return {
        open : function(obj){
          expect(obj).to.be.truely;
          var deferred = Q.defer();
          if(confirmDelete){
            deferred.resolve();
          }else{
            deferred.reject();
          }
          
          return {
            result: deferred.promise
          };
        }
      }
    });

    $provide.service('scheduleTracker',function(){
      return function(eventName,scheduleId, scheduleName) {
        trackedEvent = eventName;
      };
    });
  }));
  var $scope, $state, updateCalled, deleteCalled, confirmDelete, trackedEvent;
  beforeEach(function(){
    updateCalled = false;
    deleteCalled = false;
    trackedEvent = undefined;
    
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $state = $injector.get('$state');
      $controller('scheduleDetails', {
        $scope : $scope,
        scheduleFactory:$injector.get('scheduleFactory'),
        $modal:$injector.get('$modal'),
        $state : $state,
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  it('should exist',function(){
    expect($scope).to.be.truely;
    expect($scope.factory).to.be.truely;
    expect($scope.schedule).to.be.truely;

    expect($scope.save).to.be.a('function');
    expect($scope.confirmDelete).to.be.a('function');
  });

  describe('submit: ',function(){
    it('should return early if the form is invalid',function(){
      $scope.scheduleDetails = {};
      $scope.scheduleDetails.$valid = false;
      $scope.save();
      
      expect(updateCalled).to.be.false;
    });

    it('should save the schedule',function(){
      $scope.scheduleDetails = {};
      $scope.scheduleDetails.$valid = true;
      $scope.schedule = {id:123};
      $scope.save();

      expect(trackedEvent).to.equal('Save Schedule');
      expect(updateCalled).to.be.true;
    });
  });
  
  describe('delete: ',function(){
    beforeEach(function() {
      confirmDelete = false;
    });
    
    it('should return early the user does not confirm',function(){
      $scope.confirmDelete();
      
      expect(deleteCalled).to.be.false;
    });
    
    it('should delete the schedule',function(done){
      confirmDelete = true;
      $scope.schedule = {id:123};
      
      $scope.confirmDelete();

      setTimeout(function() {
        expect(deleteCalled).to.be.true;
        
        done();
      }, 10);
    });
    
  });

});
