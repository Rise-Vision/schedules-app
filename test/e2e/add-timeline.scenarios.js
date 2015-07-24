'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var SchedulesListPage = require('./pages/schedulesListPage.js');
var ScheduleAddPage = require('./pages/scheduleAddPage.js');
var helper = require('rv-common-e2e').helper;
var TimelineModalPage = require('./pages/timelineModalPage.js');

browser.driver.manage().window().setSize(1920, 1080);
describe("In order to have timeline on a schedule " +
  "As a user signed in " +
  "I would like to add timeline to a schedule ", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var schedulesListPage;
  var scheduleAddPage;
  var timelineModalPage;

  before(function (){
    homepage = new HomePage();
    schedulesListPage = new SchedulesListPage();
    scheduleAddPage = new ScheduleAddPage();
    commonHeaderPage = new CommonHeaderPage();
    timelineModalPage = new TimelineModalPage();

    homepage.get();
    //wait for spinner to go away.
    helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
      commonHeaderPage.signin();
    });
  });

  describe(" Given a user is adding a new schedule ", function() {
    before(function () {
      schedulesListPage.getScheduleAddButton().click();
    });

    describe('Given a user clicks on the Timeline field', function () {
      before(function () {
        scheduleAddPage.getTimelineField().click();
        helper.wait(timelineModalPage.getEditTimelineModal(), 'Edit Timeline Modal');
      });

      it('should open the Edit Timeline Modal', function () {
        expect(timelineModalPage.getEditTimelineModal().isDisplayed()).to.eventually.be.true;
      });

      it('should show modal title', function () {
        expect(timelineModalPage.getModalTitle().getText()).to.eventually.equal('Edit Timeline');
      });

      it('should show timeline fields', function() {
        expect(timelineModalPage.getEverydayCheckbox().isPresent())
          .to.eventually.be.true;
        expect(timelineModalPage.getEverydayCheckbox().isSelected())
          .to.eventually.be.true;

        expect(timelineModalPage.getAlldayCheckbox().isPresent())
          .to.eventually.be.true;
        expect(timelineModalPage.getAlldayCheckbox().isSelected())
          .to.eventually.be.true;
          
        expect(timelineModalPage.getRecurrenceCheckbox().isPresent())
          .to.eventually.be.true;
        expect(timelineModalPage.getRecurrenceCheckbox().isSelected())
          .to.eventually.be.false;
          
        expect(timelineModalPage.getWeeklyRecurrenceRadio().isDisplayed())
          .to.eventually.be.false;
      });

      describe('Given the user selects a recurrence',function () {
        before(function () {
          timelineModalPage.getRecurrenceCheckbox().click();
        });
        it('should show recurrence options', function () {
          expect(timelineModalPage.getWeeklyRecurrenceRadio().isDisplayed())
            .to.eventually.be.true;
        });
        
        it('should show weekly recurrence fields', function () {
          timelineModalPage.getWeeklyRecurrenceRadio().click();
          
          expect(timelineModalPage.getWeeklyRecurrenceFrequency().isDisplayed())
            .to.eventually.be.true;
        });
        
        it('save should update timeline correctly', function() {
          timelineModalPage.getWeeklyRecurrenceRadio().click();
          timelineModalPage.getWeeklyRecurrenceFrequency().sendKeys("0");
          timelineModalPage.getApplyButton().click();
          
          helper.clickWhenClickable(scheduleAddPage.getTimelineField(), "Re-open timeline").then(function() {
            expect(timelineModalPage.getWeeklyRecurrenceRadio().isDisplayed())
              .to.eventually.be.true;
            expect(timelineModalPage.getWeeklyRecurrenceFrequency().isDisplayed())
              .to.eventually.be.true;

            expect(timelineModalPage.getWeeklyRecurrenceFrequency().getAttribute("value"))
              .to.eventually.equal("10");            
          });

        });
      });
      
      

    });
  });
});
