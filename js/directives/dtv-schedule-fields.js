'use strict';

angular.module('risevision.schedulesApp.directives')
  .directive('scheduleFields', ['$modal', 'TYPE_URL', 'TYPE_PRESENTATION',
    function ($modal, TYPE_URL, TYPE_PRESENTATION) {
      return {
        restrict: 'E',
        templateUrl: 'partials/schedule-fields.html',
        link: function ($scope) {
          $scope.addUrlItem = function () {
            $modal.open({
              templateUrl: 'partials/url-modal.html',
              controller: 'editUrlModal',
              resolve: {
                playlistItem: function () {
                  return {
                    type: TYPE_URL,
                    name: 'URL Item'
                  };
                }
              }
            });
          };

          $scope.addPresentationItem = function () {
            $modal.open({
              templateUrl: 'partials/presentation-modal.html',
              controller: 'editPresentationModal',
              resolve: {
                playlistItem: function () {
                  return {
                    type: TYPE_PRESENTATION
                  };
                }
              }
            });
          };

        } //link()
      };
    }
  ]);
