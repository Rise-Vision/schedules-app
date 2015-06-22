'use strict';

angular.module('risevision.schedulesApp.directives')
  .directive('scheduleFields', ['$modal',
    function ($modal) {
      return {
        restrict: 'E',
        templateUrl: 'partials/schedule-fields.html',
        link: function ($scope) {
          $scope.addUrlItem = function () {
            $modal.open({
              templateUrl: 'partials/add-url-modal.html',
              controller: 'addUrlModal'
            });
          };

          $scope.addPresentationItem = function () {
            $modal.open({
              templateUrl: 'partials/add-presentation-modal.html',
              controller: 'addPresentationModal'
            });
          };

        } //link()
      };
    }
  ]);
