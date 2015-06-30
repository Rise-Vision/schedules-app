'use strict';

angular.module('risevision.schedulesApp.directives')
  .directive('scheduleFields', ['$modal', 'playlistFactory',
    function ($modal, playlistFactory) {
      return {
        restrict: 'E',
        templateUrl: 'partials/schedule-fields.html',
        link: function ($scope) {
          var openPlaylistModal = function (playlistItem) {
            $modal.open({
              templateUrl: 'partials/playlist-item.html',
              controller: 'playlistItemModal',
              size: 'md',
              resolve: {
                playlistItem: function () {
                  return playlistItem;
                }
              }
            });
          };

          $scope.addUrlItem = function () {
            openPlaylistModal(playlistFactory.getNewUrlItem());
          };

          $scope.addPresentationItem = function () {
            var modalInstance = $modal.open({
              templateUrl: 'partials/presentation-modal.html',
              controller: 'selectPresentationModal',
              resolve: {
                playlistItem: playlistFactory.getNewPresentationItem
              }
            });

            modalInstance.result.then(function (presentationDetails) {
              var playlistItem = playlistFactory.getNewPresentationItem();
              playlistItem.objectReference = presentationDetails[0];
              playlistItem.name = presentationDetails[1];

              openPlaylistModal(playlistItem);
            });
          };

        } //link()
      };
    }
  ]);
