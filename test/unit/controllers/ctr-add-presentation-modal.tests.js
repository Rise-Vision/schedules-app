'use strict';
describe('controller: Add Presentation Modal', function() {
  beforeEach(module('risevision.schedulesApp.controllers'));
  beforeEach(module('risevision.schedulesApp.services'));
  beforeEach(module(function ($provide) {
    $provide.service('$modalInstance',function(){
      return {
        close : function(){
          return;
        },
        dismiss : function(action){
          return;
        }
      }
    });
   $provide.value('TYPE_PRESENTATION', 'presentation');
  }));
  var $scope, $rootScope, $modalInstance, $modalInstanceCloseSpy, $broadcastSpy, TYPE_PRESENTATION;
  beforeEach(function(){

    inject(function($injector,_$rootScope_, $controller){
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');
      $modalInstanceCloseSpy = sinon.spy($modalInstance, 'close');
      $broadcastSpy = sinon.spy($rootScope, '$broadcast');
      TYPE_PRESENTATION = $injector.get('TYPE_PRESENTATION');
      $controller('addPresentationModal', {
        $scope : $scope,
        $rootScope: $rootScope,
        $modalInstance : $modalInstance,
        TYPE_PRESENTATION: TYPE_PRESENTATION
      });
      $scope.$digest();
    });
  });

  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.dismiss).to.be.a('function');

  });

  it('should close modal when clicked on a presentation',function(){
    var presentationId = 'presentationId';
    var presentationName = 'presentationName';
    $rootScope.$broadcast('risevision.schedules.presentation-selected',
      presentationId, presentationName);
    $scope.$digest();
    $broadcastSpy.should.have.been.calledWith('risevision.schedules.new-item',TYPE_PRESENTATION, presentationId, presentationName);
    $modalInstanceCloseSpy.should.have.been.called;
  });

  it('should dismiss modal when clicked on close with no action',function(){
    $scope.dismiss();
    $scope.$digest();
    $modalInstanceCloseSpy.should.have.been.called;
  });

});
