'use strict';

angular.module('risevision.schedulesApp', [
  'ui.router',
  'risevision.common.header',
  'risevision.common.header.templates',
  'risevision.common.components.last-modified',
  'risevision.common.components.search-filter',
  'risevision.common.components.scrolling-list',
  'risevision.common.components.focus-me',
  'risevision.common.components.confirm-instance',
  'risevision.common.components.timeline',
  'risevision.common.components.analytics',
  'risevision.common.components.distribution-selector',
  'risevision.widget.common.storage-selector',
  'ngTouch',
  'ui.bootstrap',
  'ui.bootstrap.showErrors',
  'risevision.schedulesApp.config',
  'risevision.schedulesApp.services',
  'risevision.schedulesApp.controllers',
  'risevision.schedulesApp.filters',
  'risevision.schedulesApp.directives',
  'risevision.common.loading',
  'risevision.common.i18n'
])
// Set up our mappings between URLs, templates, and controllers
.config(['$urlRouterProvider', '$stateProvider',
  function storeRouteConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/schedule/list');

    // Use $stateProvider to configure states.
    $stateProvider

    .state('schedule', {
      template: '<div ui-view></div>'
    })

    .state('schedule.root', {
      templateUrl: 'partials/landing-page.html',
      url: '/',
      controller: ['canAccessSchedules', '$state',

        function (canAccessSchedules, $state) {
          canAccessSchedules().then(function () {
            $state.go('schedule.list');
          });
        }
      ]
    })

    .state('schedule.list', {
      url: '/schedule/list',
      templateUrl: 'partials/schedules-list.html',
      controller: 'schedulesList',
      resolve: {
        canAccessSchedules: ['canAccessSchedules',
          function (canAccessSchedules) {
            return canAccessSchedules();
          }
        ]
      }
    })

    .state('schedule.details', {
      url: '/schedule/details/:scheduleId',
      templateUrl: 'partials/schedule-details.html',
      controller: 'scheduleDetails',
      resolve: {
        scheduleInfo: ['canAccessSchedules', 'scheduleFactory',
          '$stateParams',
          function (canAccessSchedules, scheduleFactory, $stateParams) {
            return canAccessSchedules().then(function () {
              //load the schedule based on the url param
              return scheduleFactory.getSchedule($stateParams.scheduleId);
            });
          }
        ]
      }
    })

    .state('schedule.add', {
      url: '/schedule/add',
      templateUrl: 'partials/schedule-add.html',
      controller: 'scheduleAdd',
      resolve: {
        scheduleInfo: ['canAccessSchedules', 'scheduleFactory',
          function (canAccessSchedules, scheduleFactory) {
            return canAccessSchedules().then(scheduleFactory.newSchedule);
          }
        ]
      }
    });
  }
])
  .run(['$rootScope', '$state', 'userState',
    function ($rootScope, $state, userState) {
      $rootScope.$on('risevision.user.signedOut', function () {
        $state.go('schedule.root');
      });

      $rootScope.$on('risevision.company.selectedCompanyChanged', function () {
        if ($state.current.name === 'schedule.list' ||
          $state.current.name === 'schedule.root') {
          $state.go($state.current.name, null, {
            reload: true
          });
        }
      });
    }
  ])
  .config(['showErrorsConfigProvider',
    function (showErrorsConfigProvider) {
      showErrorsConfigProvider.trigger('keypress');
    }
  ]);

angular.module('risevision.schedulesApp.services', [
  'risevision.common.header',
  'risevision.common.gapi'
]);

angular.module('risevision.schedulesApp.filters', []);
angular.module('risevision.schedulesApp.directives', [
  'risevision.schedulesApp.filters'
]);
angular.module('risevision.schedulesApp.controllers', []);
