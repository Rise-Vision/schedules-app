'use strict';

// Revision Status Filter
angular.module('risevision.schedulesApp.filters')
  .filter('presentationStatus',function () {
    return function (revisionStatus) {
      if (revisionStatus === 0) {
        //return $filter('translate')('schedules-app.');
        return 'Published';
      } else if(revisionStatus === 1) {
        return 'Revised';
      } else {
        return 'N/A';
      }
    };
  });
