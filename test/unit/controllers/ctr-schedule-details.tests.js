'use strict';
describe('controller: schedule details', function() {
  var scheduleId = 1234;
  beforeEach(module('risevision.schedulesApp.controllers'));
  beforeEach(module('risevision.schedulesApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
    $provide.service('schedule',function(){
      return {
        update : function(schedule){
          var deferred = Q.defer();
          if(updateSchedule){
            deferred.resolve(scheduleId);
          }else{
            deferred.reject('ERROR; could not update schedule');
          }
          return deferred.promise;
        },
        get: function(scheduleId) {
          var deferred = Q.defer();
          if(updateSchedule){
            deferred.resolve(scheduleId);
          }else{
            deferred.reject('ERROR; could not get schedule');
          }
          return deferred.promise;
        },
        delete: function(scheduleId) {
          var deferred = Q.defer();
          if(updateSchedule){
            deferred.resolve(scheduleId);
          }else{
            deferred.reject('ERROR; could not delete schedule');
          }
          return deferred.promise;
        }
      }
    });
    $provide.service('scheduleTracker', function() { 
      return function(name) {
        trackerCalled = name;
      };
    });
    $provide.service('$stateParams',function(){
      return {
        scheduleId: 'abcd1234'
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
  }));
  var $scope, userState, $state, updateSchedule, confirmDelete, trackerCalled;
  beforeEach(function(){
    trackerCalled = undefined;
    userState = function(){
      return {
        getSelectedCompanyId : function(){
          return 'some_company_id';
        },
        _restoreState : function(){

        },
        isSubcompanySelected : function(){
          return true;
        }
      }
    };
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $state = $injector.get('$state');
      $controller('scheduleDetails', {
        $scope : $scope,
        userState : $injector.get('userState'),
        schedule:$injector.get('schedule'),
        $modal:$injector.get('$modal'),
        $state : $state,
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  beforeEach(function(done) {
    updateSchedule = true;
    
    setTimeout(function(){
      expect($scope.loadingSchedule).to.be.false;
      done();
    },10);
  });

  it('should exist',function(){
    expect($scope).to.be.truely;
    expect($scope.scheduleId).to.be.truely;

    expect($scope.save).to.be.a('function');
    expect($scope.confirmDelete).to.be.a('function');
  });

  it('should init the correct defaults',function(){
    expect($scope.savingSchedule).to.be.false;
  });

  describe('submit: ',function(){
    it('should return early if the form is invalid',function(){
      $scope.scheduleDetails = {};
      $scope.scheduleDetails.$valid = false;
      $scope.save();
    });

    it('should save the schedule',function(done){
      updateSchedule = true;

      $scope.scheduleDetails = {};
      $scope.scheduleDetails.$valid = true;
      $scope.schedule = {id:123};
      $scope.save();
      expect($scope.savingSchedule).to.be.true;
      setTimeout(function(){
        expect(trackerCalled).to.equal('Schedule Updated');
        expect($scope.savingSchedule).to.be.false;
        expect($scope.submitError).to.not.be.ok;
        done();
      },10);
    });

    it('should show an error if fails to update the schedule',function(done){
      updateSchedule = false;

      $scope.$digest();
      $scope.scheduleDetails = {};
      $scope.scheduleDetails.$valid = true;
      $scope.save();
      setTimeout(function(){
        expect($state._state).to.be.empty;
        expect(trackerCalled).to.not.be.ok;
        expect($scope.savingSchedule).to.be.false;
        expect($scope.submitError).to.be.ok;
        done();
      },10);
    });
  });
  
  describe('delete: ',function(){
    beforeEach(function() {
      confirmDelete = false;
    });
    
    it('should return early the user does not confirm',function(){
      $scope.confirmDelete();
      
      expect($scope.loadingSchedule).to.be.false;
      expect($state._state).to.be.empty;
    });
    
    it('should delete the schedule',function(done){
      confirmDelete = true;
      updateSchedule = true;
      $scope.schedule = {id:123};
      
      $scope.confirmDelete();
      setTimeout(function(){
        expect($scope.loadingSchedule).to.be.false;
        expect($scope.submitError).to.not.be.ok;
        expect(trackerCalled).to.equal('Schedule Deleted');
        expect($state._state).to.equal('schedule.list');
        done();
      },10);
    });
    
    it('should show an error if fails to delete the schedule',function(done){
      confirmDelete = true;
      updateSchedule = false;
      
      $scope.confirmDelete();
      setTimeout(function(){
        expect($state._state).to.be.empty;
        expect(trackerCalled).to.not.be.ok;
        expect($scope.loadingSchedule).to.be.false;
        expect($scope.submitError).to.be.ok;
        done();
      },10);
    });
  });

});
