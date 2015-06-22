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
    $provide.service('userState',function(){
      return {
        getSelectedCompanyId : function(){
          return "companyId";
        }
      }
    });
    $provide.value('TYPE_URL', 'url');
  }));
  var $scope, $modalInstance, $modalInstanceCloseSpy, $broadcastSpy;
  beforeEach(function(){
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');
      $modalInstanceCloseSpy = sinon.spy($modalInstance, 'close');
      $broadcastSpy = sinon.spy($rootScope, '$broadcast');
      $controller('addUrlModal', {
        $scope : $scope,
        $rootScope: $rootScope,
        $modalInstance : $modalInstance,
        confirmationTitle: $injector.get('userState'),
        TYPE_URL: $injector.get('TYPE_URL')
      });
      $scope.$digest();
    });
  });
  
  it('should exist',function(){
    expect($scope).to.be.truely;

    expect($scope.add).to.be.a('function');
    expect($scope.dismiss).to.be.a('function');
  });

  it('should set the scope companyId',function(){
    expect($scope.companyId).to.be.truely;
    expect($scope.companyId).to.equal("companyId");
  });

  it('should close modal when clicked ok',function(){
    $scope.add();
    $scope.$digest();
    $broadcastSpy.should.have.been.calledWith('risevision.schedules.new-item');
    $modalInstanceCloseSpy.should.have.been.called;
  });

  it('should dismiss modal when clicked on close with no action',function(){
    $scope.dismiss();
    $scope.$digest();
    $modalInstanceCloseSpy.should.have.been.called;
  });
  
  it('should populate url on picked event',function(){
    $scope.$broadcast('picked', 'some_url');
    $scope.$digest();
    expect($scope.url).to.equal('some_url');
  });
});
