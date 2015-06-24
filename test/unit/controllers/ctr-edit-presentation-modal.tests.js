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
    $provide.service('scheduleFactory',function(){
      return {
        updatePlaylistItem : function(){
          itemUpdated = true;
        }
      }
    });
    $provide.value('playlistItem', {});
  }));
  var $scope, $rootScope, $modalInstance, $modalInstanceCloseSpy, itemUpdated;
  beforeEach(function(){
    itemUpdated = false;
    
    inject(function($injector,_$rootScope_, $controller){
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');
      $modalInstanceCloseSpy = sinon.spy($modalInstance, 'close');
      $controller('editPresentationModal', {
        $scope : $scope,
        $rootScope: $rootScope,
        $modalInstance : $modalInstance,
        scheduleFactory: $injector.get('scheduleFactory'),
        playlistItem: $injector.get('playlistItem')
      });
      $scope.$digest();
    });
  });

  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.isNew).to.be.true;

    expect($scope.dismiss).to.be.a('function');
  });

  it('should close modal when clicked on a presentation',function(){
    var presentationId = 'presentationId';
    var presentationName = 'presentationName';
    $rootScope.$broadcast('risevision.schedules.presentation-selected',
      presentationId, presentationName);

    expect(itemUpdated).to.be.true;
    $modalInstanceCloseSpy.should.have.been.called;
  });

  it('should dismiss modal when clicked on close with no action',function(){
    $scope.dismiss();

    expect(itemUpdated).to.be.false;
    $modalInstanceCloseSpy.should.have.been.called;
  });

});
