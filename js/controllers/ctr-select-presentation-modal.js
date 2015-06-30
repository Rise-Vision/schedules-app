'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('selectPresentationModal', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
      $scope.$on('risevision.schedules.presentation-selected',
        function (event, presentationId, presentationName) {
          $modalInstance.close([presentationId, presentationName]);
        }
      );

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);
