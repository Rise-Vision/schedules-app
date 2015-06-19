'use strict';

angular.module('risevision.schedulesApp.controllers')
  .controller('scheduleDetails', ['$scope', '$q', '$state', '$stateParams',
    'schedule', '$loading', '$modal', '$log', '$templateCache', 
    'scheduleTracker',
    function ($scope, $q, $state, $stateParams, schedule,
      $loading, $modal, $log, $templateCache, scheduleTracker) {
      $scope.scheduleId = $stateParams.scheduleId;
      $scope.savingSchedule = false;

      $scope.$watch('loadingSchedule', function (loading) {
        if (loading) {
          $loading.start('schedule-loader');
        } else {
          $loading.stop('schedule-loader');
        }
      });

      $scope.$watch('scheduleId', function (scheduleId) {
        if (scheduleId) {
          _getSchedule();
        }
      });

      var _getSchedule = function () {
        //load the schedule based on the url param
        $scope.loadingSchedule = true;

        schedule.get($scope.scheduleId)
          .then(function (result) {
            $scope.schedule = result.item;
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingSchedule = false;
          });
      };

      var _delete = function () {
        //show loading spinner
        $scope.loadingSchedule = true;

        schedule.delete($scope.scheduleId)
          .then(function (result) {
            scheduleTracker('Schedule Deleted', $scope.scheduleId,
              $scope.schedule.name);

            $scope.schedule = result.item;

            $state.go('schedule.list');
          })
          .then(null, function (e) {
            $scope.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            $scope.loadingSchedule = false;
          });
      };

      $scope.confirmDelete = function () {
        $scope.modalInstance = $modal.open({
          template: $templateCache.get('confirm-instance/confirm-modal.html'),
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

        $scope.modalInstance.result.then(function () {
          // do what you need if user presses ok
          _delete();
        }, function () {
          // do what you need to do if user cancels
        });
      };

      $scope.addSchedule = function () {
        if (!$scope.scheduleDetails.$dirty) {
          $state.go('schedule.add');
        } else {
          $scope.modalInstance = $modal.open({
            template: $templateCache.get('confirm-instance/confirm-modal.html'),
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
        var deferred = $q.defer();

        if (!$scope.scheduleDetails.$valid) {
          $log.error('form not valid: ', $scope.scheduleDetails.errors);
          deferred.reject();
        } else {
          $scope.savingSchedule = true;

          schedule.update($scope.scheduleId, $scope.schedule)
            .then(function (scheduleId) {
              scheduleTracker('Schedule Updated', $scope.scheduleId,
                $scope.schedule.name);

              deferred.resolve();
            })
            .then(null, function (e) {
              $scope.submitError = e.message ? e.message : e.toString();

              deferred.reject();
            })
            .finally(function () {
              $scope.savingSchedule = false;
            });
        }

        return deferred.promise;
      };

    }
  ]);
