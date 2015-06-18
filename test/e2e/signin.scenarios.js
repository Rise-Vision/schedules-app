/**
 * Created by rodrigopavezi on 6/5/15.
 */
'use strict';
var expect = require('./common/expect.js');
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('./pages/commonheaderpage.js');
var SchedulesListPage = require('./pages/schedulesListPage.js');
var helper = require('./common/helper.js');
browser.driver.manage().window().setSize(1024, 768);
describe("In order to manage schedules " +
         "As a user " +
         "I would like to be able to sign in to the Schedules app", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var schedulesListPage;
  beforeEach(function (){
    homepage = new HomePage();
    commonHeaderPage = new CommonHeaderPage();
    schedulesListPage = new SchedulesListPage();

    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
  });

  it('should sign in to the Schedules app',function(){
    commonHeaderPage.signin();
    expect(schedulesListPage.getTitle().isPresent()).to.eventually.be.true;
  });
});
