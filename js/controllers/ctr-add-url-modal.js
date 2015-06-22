'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('addUrlModal', ['$scope', '$rootScope', '$modalInstance',
    'TYPE_URL', 'userState',
    function ($scope, $rootScope, $modalInstance, TYPE_URL, userState) {
      $scope.companyId = userState.getSelectedCompanyId();

      $scope.$on('picked', function (event, url) {
        $scope.url = url;
      });

      $scope.add = function () {
        $rootScope.$broadcast('risevision.schedules.new-item',
          TYPE_URL, $scope.url);
          
        $modalInstance.close();
      };

      $scope.dismiss = function () {
        $modalInstance.close();
      };
    }
  ]);
