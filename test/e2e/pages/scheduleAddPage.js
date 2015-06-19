'use strict';
var ScheduleAddPage = function() {
  var displaysAppContainer = element(by.css('.schedules-app'));
  var title = element(by.id('title'));
  var displayNameField = element(by.model('schedule.name'));
  
  var saveButton = element(by.id('saveButton'));
  var cancelButton = element(by.id('cancelButton'));

  var deleteButton = element(by.id('deleteButton'));

  this.getSchedulesAppContainer = function() {
    return displaysAppContainer;
  };

  this.getTitle = function() {
    return title;
  };

  this.getScheduleNameField = function() {
    return displayNameField;
  };

  this.getSaveButton = function() {
    return saveButton;
  };

  this.getCancelButton = function() {
    return cancelButton;
  };

  this.getDeleteButton = function() {
    return deleteButton;
  };
};

module.exports = ScheduleAddPage;
