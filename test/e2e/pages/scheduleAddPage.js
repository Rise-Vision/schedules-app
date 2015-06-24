'use strict';
var ScheduleAddPage = function() {
  var displaysAppContainer = element(by.css('.schedules-app'));
  var title = element(by.id('title'));
  var displayNameField = element(by.model('schedule.name'));

  var addPlaylistItemButton = element(by.id('addPlaylistItemButton'));
  var addPresentationItemButton = element(by.id('addPresentationItemButton'));
  var presentationItems = element(by.repeater('presentation in presentations'));


  var saveButton = element(by.id('saveButton'));
  var cancelButton = element(by.id('cancelButton'));
  var deleteButton = element(by.id('deleteButton'));
  var deleteForeverButton = element(by.buttonText('Delete Forever'));


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

  this.getDeleteForeverButton = function() {
    return deleteForeverButton;
  };

  this.getAddPlaylistItemButton = function() {
    return addPlaylistItemButton;
  };

  this.getAddPresentationItemButton = function() {
    return addPresentationItemButton;
  };

  this.getAddPresentationModal = function() {
    return addPresentationModal;
  };

  this.getModalTitle = function() {
    return modalTitle;
  };

  this.getPresentationSearchInput = function() {
    return presentationSearchInput;
  };

  this.getPresentationListTable = function() {
    return presentationListTable;
  };

  this.getPresentationItems = function() {
    return presentationItems;
  };

};

module.exports = ScheduleAddPage;
