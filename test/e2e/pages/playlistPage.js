'use strict';
var PlaylistPage = function() {
  var moveUpButtons = element.all(by.id('moveUpButton'));
  var moveDownButtons = element.all(by.id('moveDownButton'));
  var expandButtons = element.all(by.id('expandButton'));
  var removeButtons = element.all(by.id('removeButton'));
  var itemNameTextboxes = element.all(by.id('itemName'));
  var removeItemButton = element(by.id("confirmForm")).element(by.buttonText('Remove'));

  this.getMoveUpButtons = function() {
    return moveUpButtons;
  };
  
  this.getMoveDownButtons = function() {
    return moveDownButtons;
  };
  
  this.getExpandButtons = function() {
    return expandButtons;
  };
  
  this.getRemoveButtons = function() {
    return removeButtons;
  };
  
  this.getItemNameTextboxes = function() {
    return itemNameTextboxes;
  };
  
  this.getRemoveItemButton = function() {
    return removeItemButton;
  };
  
};

module.exports = PlaylistPage;
