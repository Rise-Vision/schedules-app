'use strict';
var PlaylistItemModalPage = function() {
  var playlistItemModal = element(by.id('playlistItemModal'));
  var modalTitle = element(by.css('#playlistItemModal .modal-title'));
  var nameTextbox = element(by.id('itemName'));
  var durationTextbox = element(by.id('itemDuration'));
  // url item fields
  var urlInput = element(by.id('url'));
  var storageSelectorIcon = element(by.css('.input-group-addon .btn-widget-icon-storage'));

  var saveButton = element(by.id('itemSave'));

  this.getPlaylistItemModal = function () {
    return playlistItemModal;
  };

  this.getModalTitle = function () {
    return modalTitle;
  };

  this.getNameTextbox = function() {
    return nameTextbox;
  };
  
  this.getDurationTextbox = function() {
    return durationTextbox;
  };
  
  this.getUrlInput = function() {
    return urlInput;
  };

  this.getStorageSelectorIcon = function() {
    return storageSelectorIcon;
  };
  
  this.getSaveButton = function() {
    return saveButton;
  };
  
};

module.exports = PlaylistItemModalPage;
