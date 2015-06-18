'use strict';
var expect = require('./common/expect.js');
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('./pages/commonheaderpage.js');

browser.driver.manage().window().setSize(1024, 768);
describe("In order to manage schedules " +
         "As a user " +
         "I would like to have access to the homepage of the schedules app", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  beforeEach(function (){
    homepage = new HomePage();
    commonHeaderPage = new CommonHeaderPage();
    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
  });

  it('should load',function(){
    expect(homepage.getSchedulesAppContainer().isPresent()).to.eventually.be.true;
  });

  it('should load common header',function(){
    expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
  });

  it('should have a schedule menu item on the common header',function(){
   expect(commonHeaderPage.getScheduleMenuItem().isPresent()).to.eventually.be.true;
   expect(commonHeaderPage.getScheduleMenuItem().getText()).to.eventually.equal('Schedules');
  });

  it('should go to home when clicking on Schedules menu item',function(){
    commonHeaderPage.getScheduleMenuItem().click();
    expect(browser.getCurrentUrl()).to.eventually.equal(homepage.getUrl());
  });

});
