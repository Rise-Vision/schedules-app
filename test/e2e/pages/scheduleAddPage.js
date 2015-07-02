'use strict';
var ScheduleAddPage = function() {
  var schedulesAppContainer = element(by.css('.schedules-app'));
  var title = element(by.id('title'));
  var displayNameField = element(by.model('schedule.name'));

  var addPlaylistItemButton = element(by.id('addPlaylistItemButton'));
  var addUrlItemButton = element(by.id('addUrlItemButton'));
  var addPresentationItemButton = element(by.id('addPresentationItemButton'));
  var playlistItems = element.all(by.repeater('playlistItem in playlistItems'));

  var previewButton = element(by.id('previewButton'));

  var saveButton = element(by.id('saveButton'));
  var cancelButton = element(by.id('cancelButton'));
  var deleteButton = element(by.id('deleteButton'));
  var deleteForeverButton = element(by.buttonText('Delete Forever'));


  this.getSchedulesAppContainer = function() {
    return schedulesAppContainer;
  };

  this.getTitle = function() {
    return title;
  };

  this.getScheduleNameField = function() {
    return displayNameField;
  };

  this.getPreviewButton = function() {
    return previewButton;
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

  this.getAddUrlItemButton = function() {
    return addUrlItemButton;
  };

  this.getPlaylistItems = function() {
    return playlistItems;
  };

};

module.exports = ScheduleAddPage;
