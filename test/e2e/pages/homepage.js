'use strict';
var config = require('../config/config.json');

var HomePage = function() {
  var url = config.rootUrl + '/#/';
  var schedulesAppContainer = element(by.css('.schedules-app'));

  var schedulesImage = element(by.id('schedules-image'));
  var manageSchedulesText = element(by.id('manage-schedules-text'));
  var schedulesExplanationText = element(by.id('schedules-explanation-text'));
  var signUpText = element(by.id('sign-up-text'));
  var signInText = element(by.id('sign-in-text'));
  var signUpLink = element(by.id('sign-up-link'));
  var signInLink = element(by.id('sign-in-link'));

  this.get = function() {
    browser.get(url);
  };

  this.getUrl = function() {
    return url;
  }

  this.getSchedulesAppContainer = function() {
    return schedulesAppContainer;
  };

  this.getSchedulesImage = function() {
    return schedulesImage;
  };

  this.getManageSchedulesText = function() {
    return manageSchedulesText;
  };

  this.getSchedulesExplanationText = function() {
    return schedulesExplanationText;
  };

  this.getSignUpText = function() {
    return signUpText;
  };

  this.getSignInText = function() {
    return signInText;
  };

  this.getSignUpLink = function() {
    return signUpLink;
  };

  this.getSignInLink = function() {
    return signInLink;
  };
};

module.exports = HomePage;
