'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var helper = require('rv-common-e2e').helper;


browser.driver.manage().window().setSize(1920, 1080);
describe("In order to manage schedules " +
         "As a user " +
         "I would like to have access to the homepage of the schedules app", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  before(function (){
    homepage = new HomePage();
    commonHeaderPage = new CommonHeaderPage();
    homepage.get();
    helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
      commonHeaderPage.signin();
    });
  });

  it('should load',function(){
    expect(homepage.getSchedulesAppContainer().isPresent()).to.eventually.be.true;
  });

  it('should load common header',function(){
    expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
  });

  it('should have a schedule menu item on the common header',function(){
   expect(commonHeaderPage.getCommonHeaderMenuItems().get(0).isPresent()).to.eventually.be.true;
   expect(commonHeaderPage.getCommonHeaderMenuItems().get(0).getText()).to.eventually.equal('Schedules');
  });

  it('should go to home when clicking on Schedules menu item',function(){
    commonHeaderPage.getCommonHeaderMenuItems().get(0).click();
    expect(browser.getCurrentUrl()).to.eventually.equal(homepage.getUrl()+"schedule/list?cid=ac57def2-834e-4ecd-8b91-44ca14524fd0");
  });

});
