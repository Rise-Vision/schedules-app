'use strict';
var TimelineModalPage = function() {
  var editTimelineModal = element(by.id('timelineModal'));
  var modalTitle = element(by.css('.modal-title'));

  var everydayCheckbox = element(by.model("timeline.everyDay"));
  var alldayCheckbox = element(by.model("timeline.allDay"));
  var recurrenceCheckbox = element(by.model("timeline.hasRecurrence"));
  
  var weeklyRecurrenceRadio = element(by.id("Weekly"));
  var weeklyRecurrenceFrequency = element(by.model("recurrence.weekly.recurrenceFrequency"));

  var applyButton = element.all(by.css(".modal-footer .btn")).first();
  var cancelButton = element.all(by.css(".modal-footer .btn")).last();

  this.getEditTimelineModal = function() {
    return editTimelineModal;
  };

  this.getModalTitle = function() {
    return modalTitle;
  };
  
  this.getEverydayCheckbox = function () {
    return everydayCheckbox;
  };
  
  this.getAlldayCheckbox = function() {
    return alldayCheckbox;
  };
  
  this.getRecurrenceCheckbox = function() {
    return recurrenceCheckbox;
  };
  
  this.getWeeklyRecurrenceRadio = function() {
    return weeklyRecurrenceRadio;
  }

  this.getWeeklyRecurrenceFrequency = function() {
    return weeklyRecurrenceFrequency;
  }

  this.getApplyButton = function() {
    return applyButton;
  };

  this.getCancelButton = function() {
    return cancelButton;
  };

};

module.exports = TimelineModalPage;
