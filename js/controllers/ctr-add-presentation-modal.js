'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('addPresentationModal', ['$scope', '$rootScope', '$modalInstance',
    'TYPE_PRESENTATION',
    function ($scope, $rootScope, $modalInstance, TYPE_PRESENTATION) {
      $scope.add = function (presentationId, presentationName) {
        $rootScope.$broadcast('risevision.schedules.new-item',
          TYPE_PRESENTATION, $scope.url, presentationId, presentationName);
      };

      $scope.dismiss = function () {
        $modalInstance.close();
      };
    }
  ]);
