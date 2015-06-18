'use strict';
var expect = require('./common/expect.js');
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('./pages/commonheaderpage.js');
var SchedulesListPage = require('./pages/schedulesListPage.js');
var ScheduleAddPage = require('./pages/scheduleAddPage.js');
var helper = require('./common/helper.js');

browser.driver.manage().window().setSize(1024, 768);
describe("In order to manage schedules " +
  "As a user signed in " +
  "I would like to add schedules", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var schedulesListPage;
  var scheduleAddPage;

  beforeEach(function (){
    homepage = new HomePage();
    schedulesListPage = new SchedulesListPage();
    scheduleAddPage = new ScheduleAddPage();
    commonHeaderPage = new CommonHeaderPage();

    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
    commonHeaderPage.signin();
    schedulesListPage.getScheduleAddButton().click();
  });

  it('should show schedule add page',function(){
    expect(scheduleAddPage.getScheduleNameField().isPresent()).to.eventually.be.true;
  });

  it('should show Save Button',function(){
    expect(scheduleAddPage.getSaveButton().isPresent()).to.eventually.be.true;
  });

  it('should show Cancel Button',function(){
    expect(scheduleAddPage.getCancelButton().isPresent()).to.eventually.be.true;
  });

  it('should add schedule',function(){
    var scheduleName = 'TEST_E2E_SCHEDULE';
    scheduleAddPage.getScheduleNameField().sendKeys(scheduleName);
    scheduleAddPage.getSaveButton().click();
    helper.wait(scheduleAddPage.getDeleteButton(), 'Delete Button');
    expect(scheduleAddPage.getDeleteButton().isDisplayed()).to.eventually.be.true;
  });
});
