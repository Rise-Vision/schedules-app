'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('editPresentationModal', ['$scope', '$rootScope',
    '$modalInstance', 'playlistFactory', 'playlistItem',
    function ($scope, $rootScope, $modalInstance, playlistFactory,
      playlistItem) {
      $scope.isNew = !playlistItem.objectReference;

      $rootScope.$on('risevision.schedules.presentation-selected',
        function (event, presentationId, presentationName) {
          playlistItem.objectReference = presentationId;
          playlistItem.name = presentationName;

          playlistFactory.updatePlaylistItem(playlistItem);

          $scope.dismiss();
        });

      $scope.dismiss = function () {
        $modalInstance.close();
      };
    }
  ]);
