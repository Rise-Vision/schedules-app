'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('scheduleAdd', ['$scope', '$state', 'schedule', '$loading',
    '$log', 'scheduleTracker',
    function ($scope, $state, schedule, $loading, $log, scheduleTracker) {
      $scope.schedule = {};
      $scope.savingSchedule = false;

      $scope.$watch('savingSchedule', function (loading) {
        if (loading) {
          $loading.start('schedules-loader');
        } else {
          $loading.stop('schedules-loader');
        }
      });

      $scope.save = function (id, comment, toggleStatus) {
        if (!$scope.scheduleDetails.$valid) {
          $log.error('form not valid: ', $scope.scheduleDetails.errors);
          return;
        }

        $scope.savingSchedule = true;

        schedule.add($scope.schedule)
          .then(function (resp) {
            if (resp && resp.item && resp.item.id) {
              scheduleTracker('Schedule Created', resp.item.id, resp.item.name);

              $state.go('schedule.details', {
                scheduleId: resp.item.id
              });
            }
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.savingSchedule = false;
          });
      };

    }
  ]);
