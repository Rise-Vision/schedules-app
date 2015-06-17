'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('AppCtrl', ['$scope', '$location',
    function ($scope, $rootScope, $location) {
      $scope.navOptions = [{
        title: 'Schedules',
        link: '#/',
        states: ['root.common.schedules']
      }];
      $scope.navSelected = 'root.common.schedules';
    }
  ]); //ctr
