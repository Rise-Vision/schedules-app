'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('addPresentationModal', ['$scope', '$rootScope', '$modalInstance',
    'TYPE_PRESENTATION',
    function ($scope, $rootScope, $modalInstance, TYPE_PRESENTATION) {

      $rootScope.$on('risevision.schedules.presentation-selected', function (event,presentationId, presentationName) {
        $rootScope.$broadcast('risevision.schedules.new-item',
          TYPE_PRESENTATION, presentationId, presentationName);
        console.log("Presentation Id: " + presentationId);
        console.log("Presentation Name: " + presentationName);
        $modalInstance.close();
      });

      $scope.dismiss = function () {
        $modalInstance.close();
      };
    }
  ]);
