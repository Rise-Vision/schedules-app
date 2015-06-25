'use strict';
var UrlModalPage = function() {
  var addUrlModal = element(by.id('addUrlModal'));
  var modalTitle = element(by.css('.modal-title'));
  var urlInput = element(by.id('url'));
  var storageSelectorIcon = element(by.css('.input-group-addon .btn-widget-icon-storage'));
  var updateButton = element(by.id('updateButton'));

  this.getAddUrlModal = function() {
    return addUrlModal;
  };

  this.getModalTitle = function() {
    return modalTitle;
  };

  this.getUrlInput = function() {
    return urlInput;
  };

  this.getStorageSelectorIcon = function() {
    return storageSelectorIcon;
  };
  
  this.getUpdateButton = function() {
    return updateButton;
  };

};

module.exports = UrlModalPage;
