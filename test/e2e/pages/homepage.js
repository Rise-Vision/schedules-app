'use strict';
var config = require('../config/config.json');
var HomePage = function() {
  var url = config.rootUrl + '/#/';
  var schedulesAppContainer = element(by.css('.schedules-app'));



  this.get = function() {
    browser.get(url);
  };

  this.getUrl = function() {
    return url;
  }

  this.getSchedulesAppContainer = function() {
    return schedulesAppContainer;
  };
};

module.exports = HomePage;
