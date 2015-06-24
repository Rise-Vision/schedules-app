'use strict';

angular.module('risevision.schedulesApp.directives')
  .directive('playlist', ['$modal',
    function ($modal) {
      return {
        restrict: 'E',
        scope: {
          playlistItems: '='
        },
        templateUrl: 'partials/playlist.html',
        link: function () {} //link()
      };
    }
  ]);
