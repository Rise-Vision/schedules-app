'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('scheduleDetails', ['$scope', '$q', '$state',
    'scheduleFactory', '$loading', '$log', '$modal', '$templateCache',
    'scheduleTracker',
    function ($scope, $q, $state, scheduleFactory, $loading, $log, $modal,
      $templateCache, scheduleTracker) {
      $scope.factory = scheduleFactory;
      $scope.schedule = scheduleFactory.schedule;

      $scope.$watch('factory.loadingSchedule', function (loading) {
        if (loading) {
          $loading.start('schedule-loader');
        } else {
          $loading.stop('schedule-loader');
        }
      });

      $scope.confirmDelete = function () {
        $scope.modalInstance = $modal.open({
          template: $templateCache.get(
            'confirm-instance/confirm-modal.html'),
          controller: 'confirmInstance',
          windowClass: 'modal-custom',
          resolve: {
            confirmationTitle: function () {
              return 'schedules-app.details.deleteTitle';
            },
            confirmationMessage: function () {
              return 'schedules-app.details.deleteWarning';
            },
            confirmationButton: function () {
              return 'common.delete-forever';
            },
            cancelButton: null
          }
        });

        $scope.modalInstance.result.then(scheduleFactory.deleteSchedule);
      };

      $scope.addSchedule = function () {
        if (!$scope.scheduleDetails.$dirty) {
          $state.go('schedule.add');
        } else {
          $scope.modalInstance = $modal.open({
            template: $templateCache.get(
              'confirm-instance/confirm-modal.html'),
            controller: 'confirmInstance',
            windowClass: 'modal-custom',
            resolve: {
              confirmationTitle: function () {
                return 'schedules-app.details.unsavedTitle';
              },
              confirmationMessage: function () {
                return 'schedules-app.details.unsavedWarning';
              },
              confirmationButton: function () {
                return 'common.save';
              },
              cancelButton: function () {
                return 'common.discard';
              }
            }
          });

          $scope.modalInstance.result.then(function () {
            // do what you need if user presses ok
            $scope.save()
              .then(function () {
                $state.go('schedule.add');
              });
          }, function (value) {
            // do what you need to do if user cancels
            if (value) {
              $state.go('schedule.add');
            }
          });
        }
      };

      $scope.save = function () {
        scheduleTracker('Save Schedule', scheduleFactory.schedule.id,
          scheduleFactory.schedule.name);
        if (!$scope.scheduleDetails.$valid) {
          $log.info('form not valid: ', $scope.scheduleDetails.$error);

          return $q.reject();
        } else {
          return scheduleFactory.updateSchedule();
        }
      };

    }
  ]);
