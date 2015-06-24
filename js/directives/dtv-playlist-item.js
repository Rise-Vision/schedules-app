'use strict';

angular.module('risevision.schedulesApp.directives')
  .directive('playlistItem', ['$modal', 'playlistFactory', 'TYPE_PRESENTATION',
    '$templateCache',
    function ($modal, playlistFactory, TYPE_PRESENTATION, $templateCache) {
      return {
        restrict: 'E',
        scope: {
          playlistItem: '='
        },
        templateUrl: 'partials/playlist-item.html',
        link: function ($scope) {
          $scope.factory = playlistFactory;

          $scope.remove = function () {
            $scope.modalInstance = $modal.open({
              template: $templateCache.get(
                'confirm-instance/confirm-modal.html'),
              controller: 'confirmInstance',
              windowClass: 'modal-custom',
              resolve: {
                confirmationTitle: function () {
                  return 'Remove Playlist Item';
                },
                confirmationMessage: function () {
                  return 'Are you sure you want to remove ' +
                    'this item from the Playlist?';
                },
                confirmationButton: function () {
                  return 'Remove';
                },
                cancelButton: null
              }
            });

            $scope.modalInstance.result.then(function () {
              playlistFactory.removePlaylistItem($scope.playlistItem);
            });
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
