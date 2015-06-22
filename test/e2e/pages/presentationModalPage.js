'use strict';
var PresentationModalPage = function() {
  var addPresentationModal = element(by.id('addPresentationModal'));
  var modalTitle = element(by.css('.modal-title'));
  var presentationSearchInput = element(by.id('presentationSearchInput'));
  var presentationListTable = element(by.id('presentationListTable'));
  var presentationItems = element(by.repeater('presentation in presentations'));
  var presentationListLoader = element(by.xpath('//div[@spinner-key="presentation-list-loader"]'));


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

  this.getPresentationListLoader = function() {
    return presentationListLoader;
  };

};

module.exports = PresentationModalPage;
