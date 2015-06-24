'use strict';
describe('controller: Add Url Modal', function() {
  beforeEach(module('risevision.schedulesApp.controllers'));
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
  var $scope, $modalInstance, $modalInstanceCloseSpy, itemUpdated;
  beforeEach(function(){
    itemUpdated = false;
    
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');
      $modalInstanceCloseSpy = sinon.spy($modalInstance, 'close');
      $controller('editUrlModal', {
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

    expect($scope.updateUrl).to.be.a('function');
    expect($scope.dismiss).to.be.a('function');
  });

  it('should close modal when clicked ok',function(){
    $scope.updateUrl();

    expect(itemUpdated).to.be.true;
    $modalInstanceCloseSpy.should.have.been.called;
  });

  it('should dismiss modal when clicked on close with no action',function(){
    $scope.dismiss();
    
    expect(itemUpdated).to.be.false;
    $modalInstanceCloseSpy.should.have.been.called;
  });
  
  it('should populate url on picked event',function(){
    $scope.$broadcast('picked', 'some_url');
    $scope.$digest();
    expect($scope.url).to.equal('some_url');
  });
});
