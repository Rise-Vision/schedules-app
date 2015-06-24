'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('editUrlModal', ['$scope', '$rootScope', '$modalInstance',
    'scheduleFactory', 'playlistItem',
    function ($scope, $rootScope, $modalInstance, scheduleFactory,
      playlistItem) {
      $scope.isNew = !playlistItem.objectReference;
      $scope.url = playlistItem.objectReference;

      $scope.updateUrl = function () {
        playlistItem.objectReference = $scope.url;

        scheduleFactory.updatePlaylistItem(playlistItem);

        $scope.dismiss();
      };

      $scope.$on('picked', function (event, url) {
        $scope.url = url;
      });

      $scope.dismiss = function () {
        $modalInstance.close();
      };
    }
  ]);
