'use strict';
describe('controller: schedule add', function() {
  var scheduleId = 1234;
  beforeEach(module('risevision.schedulesApp.controllers'));
  beforeEach(module('risevision.schedulesApp.services'));
  beforeEach(module(mockTranlate()));
  beforeEach(module(function ($provide) {
    $provide.service('scheduleFactory',function(){
      return {
        schedule: {},
        loadingSchedule: true,
        addSchedule : function(){
          scheduleAdded = true;
        }
      };
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

    $provide.service('scheduleTracker',function(){
      return function(eventName,scheduleId, scheduleName) {
        trackedEvent = eventName;
      };
    });

  }));
  var $scope, scheduleFactory, $loading,$loadingStartSpy, $loadingStopSpy, scheduleAdded, trackedEvent;
  beforeEach(function(){
    scheduleAdded = false;
    trackedEvent = undefined;
    
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      scheduleFactory = $injector.get('scheduleFactory');
      $loading = $injector.get('$loading');
      $loadingStartSpy = sinon.spy($loading, 'start');
      $loadingStopSpy = sinon.spy($loading, 'stop');
      $controller('scheduleAdd', {
        $scope : $scope,
        scheduleFactory: scheduleFactory,
        $loading: $loading,
        $log: $injector.get('$log')
      });
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

  it('should save the schedule',function(){
    $scope.scheduleDetails = {};
    $scope.scheduleDetails.$valid = true;
    $scope.schedule = {id:123};
    $scope.save();

    expect(trackedEvent).to.equal('Save Schedule');
    expect(scheduleAdded).to.be.true;

  });

  it('should show/hide loading spinner if loading', function(done) {
    $scope.$digest();
    $loadingStartSpy.should.have.been.calledWith('schedule-loader');

    scheduleFactory.loadingSchedule = false;
    $scope.$digest();
    setTimeout(function(){
      $loadingStopSpy.should.have.been.calledWith('schedule-loader');
      done();
    },10);
  })
});
