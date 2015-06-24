'use strict';

angular.module('risevision.schedulesApp.directives')
  .directive('playlistItem', ['$modal', 'TYPE_PRESENTATION',
    function ($modal, TYPE_PRESENTATION) {
      return {
        restrict: 'E',
        scope: {
          playlistItem: '='
        },
        templateUrl: 'partials/playlist-item.html',
        link: function ($scope) {
          $scope.remove = function () {
            
          };

          $scope.changeItem = function () {
            if ($scope.playlistItem.type === TYPE_PRESENTATION) {
              editPresentationItem();
            } else {
              editUrlItem();
            }
          };

          var editUrlItem = function () {
            $modal.open({
              templateUrl: 'partials/url-modal.html',
              controller: 'editUrlModal',
              resolve: {
                playlistItem: function () {
                  return $scope.playlistItem;
                }
              }
            });
          };

          var editPresentationItem = function () {
            $modal.open({
              templateUrl: 'partials/presentation-modal.html',
              controller: 'editPresentationModal',
              resolve: {
                playlistItem: function () {
                  return $scope.playlistItem;
                }
              }
            });
          };

        } //link()
      };
    }
  ]);
