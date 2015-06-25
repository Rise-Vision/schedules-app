'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('editUrlModal', ['$scope', '$rootScope', '$modalInstance',
    'userState', 'playlistFactory', 'playlistItem',
    function ($scope, $rootScope, $modalInstance, userState, playlistFactory,
      playlistItem) {
      $scope.companyId = userState.getSelectedCompanyId();
      $scope.isNew = !playlistItem.objectReference;
      $scope.url = playlistItem.objectReference;

      $scope.updateUrl = function () {
        playlistItem.objectReference = $scope.url;

        playlistFactory.updatePlaylistItem(playlistItem);

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
