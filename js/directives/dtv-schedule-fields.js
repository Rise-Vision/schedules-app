'use strict';

angular.module('risevision.schedulesApp.directives')
  .directive('scheduleFields', [

    function () {
      return {
        restrict: 'E',
        templateUrl: 'partials/schedule-fields.html',
        link: function ($scope) {

        } //link()
      };
    }
  ]);
