/*
 * App Configuration File
 * Put environment-specific global variables in this file.
 *
 * In general, if you put an variable here, you will want to
 * make sure to put an equivalent variable in all three places:
 * dev.js, test.js & prod.js
 *
 */

(function (angular) {

  'use strict';

  angular.module('risevision.common.i18n.config', [])
    .constant('LOCALES_PREFIX', 'locales/translation_')
    .constant('LOCALES_SUFIX', '.json');

  angular.module('risevision.editorApp.config', [])
    .value('STORAGE_API_ROOT',
      'https://storage-dot-rvacore-test.appspot.com/_ah/api')
    .value('CORE_URL', 'https://rvacore-test.appspot.com/_ah/api') // override default core value
    .value('VIEWER_URL', 'http://rvaviewer-test.appspot.com');

  angular.module('risevision.widget.common.storage-selector.config')
    .value('STORAGE_MODAL',
      'https://storage-stage-rva-test.risevision.com/files/');

})(angular);
