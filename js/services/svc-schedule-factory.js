'use strict';

angular.module('risevision.schedulesApp.services')
  .factory('scheduleFactory', ['$q', '$state', '$stateParams', 'schedule',
    'scheduleTracker',
    function ($q, $state, $stateParams, schedule, scheduleTracker) {
      var factory = {};
      var _scheduleId;

      factory.schedule = {};
      factory.loadingSchedule = false;
      factory.savingSchedule = false;
      factory.submitError = '';

      factory.newSchedule = function () {
        _scheduleId = undefined;

        factory.schedule = {};
      };

      factory.getSchedule = function (scheduleId) {
        var deferred = $q.defer();

        //load the schedule based on the url param
        _scheduleId = scheduleId;

        //show loading spinner
        factory.loadingSchedule = true;

        schedule.get(_scheduleId)
          .then(function (result) {
            factory.schedule = result.item;

            deferred.resolve();
          })
          .then(null, function (e) {
            factory.submitError = e.message ? e.message : e.toString();

            deferred.reject();
          })
          .finally(function () {
            factory.loadingSchedule = false;
          });

        return deferred.promise;
      };

      factory.addSchedule = function () {
        //show loading spinner
        factory.loadingSchedule = true;
        factory.savingSchedule = true;

        schedule.add(factory.schedule)
          .then(function (resp) {
            if (resp && resp.item && resp.item.id) {
              scheduleTracker('Schedule Created', resp.item.id, resp.item.name);

              $state.go('schedule.details', {
                scheduleId: resp.item.id
              });
            }
          })
          .then(null, function (e) {
            factory.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            factory.loadingSchedule = false;
            factory.savingSchedule = false;
          });
      };

      factory.updateSchedule = function () {
        var deferred = $q.defer();

        //show loading spinner
        factory.loadingSchedule = true;
        factory.savingSchedule = true;

        schedule.update(_scheduleId, factory.schedule)
          .then(function (scheduleId) {
            scheduleTracker('Schedule Updated', _scheduleId,
              factory.schedule.name);

            deferred.resolve();
          })
          .then(null, function (e) {
            factory.submitError = e.message ? e.message : e.toString();

            deferred.reject();
          })
          .finally(function () {
            factory.loadingSchedule = false;
            factory.savingSchedule = false;
          });

        return deferred.promise;
      };

      factory.deleteSchedule = function () {
        //show loading spinner
        factory.loadingSchedule = true;

        schedule.delete(_scheduleId)
          .then(function () {
            scheduleTracker('Schedule Deleted', _scheduleId,
              factory.schedule.name);

            factory.schedule = {};

            $state.go('schedule.list');
          })
          .then(null, function (e) {
            factory.submitError = e.message ? e.message : e.toString();
          })
          .finally(function () {
            factory.loadingSchedule = false;
          });
      };

      return factory;
    }
  ]);
