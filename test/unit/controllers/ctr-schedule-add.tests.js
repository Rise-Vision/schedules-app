'use strict';
describe('controller: schedule add', function() {
  var scheduleId = 1234;
  beforeEach(module('risevision.schedulesApp.controllers'));
  beforeEach(module('risevision.schedulesApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
    $provide.service('schedule',function(){
      return {
        _schedule: {},
        add : function(schedule){
          var deferred = Q.defer();
          if(updateSchedule){
            this._schedule = schedule;
            deferred.resolve({item: schedule});
          }else{
            deferred.reject('ERROR; could not create schedule');
          }
          return deferred.promise;
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
    $provide.service('$loading',function(){
      return {
        start : function(spinnerKeys){
          return;
        },
        stop : function(spinnerKeys){
          return;
        }
      }
    });
    $provide.service('scheduleTracker', function() { 
      return function(name) {
        trackerCalled = name;
      };
    });

  }));
  var $scope, userState, $state, updateSchedule,$loading,$loadingStartSpy, $loadingStopSpy,
  trackerCalled;
  beforeEach(function(){
    updateSchedule = true;
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
      $loading = $injector.get('$loading');
      $loadingStartSpy = sinon.spy($loading, 'start');
      $loadingStopSpy = sinon.spy($loading, 'stop');
      $controller('scheduleAdd', {
        $scope : $scope,
        $state : $state,
        schedule: $injector.get('schedule'),
        $loading: $loading,
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.save).to.be.a('function');
  });

  it('should init the correct defaults',function(){
    expect($scope.schedule).to.be.truely;
    expect($scope.schedule).to.deep.equal({});
  });

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
    $scope.$digest();
    $loadingStartSpy.should.have.been.calledWith('schedules-loader');
    setTimeout(function(){
      expect($state._state).to.equal('schedule.details');
      expect(trackerCalled).to.equal('Schedule Created');
      expect($scope.savingSchedule).to.be.false;
      expect($state.submitError).to.not.be.ok;
      $loadingStopSpy.should.have.been.calledWith('schedules-loader');
      done();
    },10);
  });

  it('should show an error if fails to create schedule',function(done){
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
