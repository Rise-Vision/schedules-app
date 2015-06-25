'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var SchedulesListPage = require('./pages/schedulesListPage.js');
var ScheduleAddPage = require('./pages/scheduleAddPage.js');
var PlaylistPage = require('./pages/playlistPage.js');
var helper = require('rv-common-e2e').helper;
var UrlModalPage = require('./pages/urlModalPage.js');

browser.driver.manage().window().setSize(1024, 768);
describe('Add URL to a schedule ' +
  'As a user signed in ' +
  'I would like to add URLs to a schedule ', function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var schedulesListPage;
  var scheduleAddPage;
  var playlistPage;
  var urlModalPage;

  before(function (){
    homepage = new HomePage();
    schedulesListPage = new SchedulesListPage();
    scheduleAddPage = new ScheduleAddPage();
    playlistPage = new PlaylistPage();
    commonHeaderPage = new CommonHeaderPage();
    urlModalPage = new UrlModalPage();

    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
    commonHeaderPage.signin();
  });

  describe(' Given a user is adding a new schedule and a few playlist items', function() {
    before(function () {
      schedulesListPage.getScheduleAddButton().click();
      
      scheduleAddPage.getAddPlaylistItemButton().click();
      scheduleAddPage.getAddUrlItemButton().click();

      urlModalPage.getUrlInput().sendKeys('http://risevision.com/content1.html');
      urlModalPage.getUpdateButton().click();
      
      // wait for transitions
      browser.sleep(500);

      scheduleAddPage.getAddPlaylistItemButton().click();
      scheduleAddPage.getAddUrlItemButton().click();

      urlModalPage.getUrlInput().sendKeys('http://risevision.com/content2.html');
      urlModalPage.getUpdateButton().click();
    });

    describe('Should manage playlist items', function () {
      it('should have 2 items the Playlist', function () {
        expect(scheduleAddPage.getPlaylistItems().count()).to.eventually.equal(2);
        
        expect(scheduleAddPage.getPlaylistItems().get(0).getText()).to.eventually.contain('content1.html');
        expect(scheduleAddPage.getPlaylistItems().get(1).getText()).to.eventually.contain('content2.html');
      });
      
      it('arrows should be disabled', function () {
        expect(playlistPage.getMoveUpButtons().get(0).isEnabled()).to.eventually.be.false;
        expect(playlistPage.getMoveDownButtons().get(1).isEnabled()).to.eventually.be.false;

        expect(playlistPage.getMoveUpButtons().get(1).isEnabled()).to.eventually.be.true;
        expect(playlistPage.getMoveDownButtons().get(0).isEnabled()).to.eventually.be.true;
      });
      
      it('items should move up and down', function () {
        playlistPage.getMoveUpButtons().get(1).click();
        
        expect(scheduleAddPage.getPlaylistItems().get(0).getText()).to.eventually.contain('content2.html');
        expect(scheduleAddPage.getPlaylistItems().get(1).getText()).to.eventually.contain('content1.html');
        
        playlistPage.getMoveDownButtons().get(0).click();
        
        expect(scheduleAddPage.getPlaylistItems().get(0).getText()).to.eventually.contain('content1.html');
        expect(scheduleAddPage.getPlaylistItems().get(1).getText()).to.eventually.contain('content2.html');
      });
      
      it('should expand/retract properties', function () {
        playlistPage.getExpandButtons().get(0).click();
                
        helper.wait(playlistPage.getItemNameTextboxes().get(0), 'Item Name Text Box');
        
        expect(playlistPage.getItemNameTextboxes().get(0).isDisplayed()).to.eventually.be.true;
        expect(playlistPage.getRemoveButtons().get(0).isDisplayed()).to.eventually.be.true;

        playlistPage.getExpandButtons().get(0).click();
        helper.waitDisappear(playlistPage.getItemNameTextboxes().get(0), 'Item Name Text Box');
        
        expect(playlistPage.getItemNameTextboxes().get(0).isDisplayed()).to.eventually.be.false;
        expect(playlistPage.getRemoveButtons().get(0).isDisplayed()).to.eventually.be.false;
      });
      
      it('should remove item', function (done) {
        playlistPage.getExpandButtons().get(0).click();        

        helper.clickWhenClickable(playlistPage.getRemoveButtons().get(0), "Remove Item Button").then(function () {
          helper.clickWhenClickable(playlistPage.getRemoveItemButton(), "Remove Item Confirm Button").then(function () {
            expect(scheduleAddPage.getPlaylistItems().count()).to.eventually.equal(1);
            
            done();
          });
        });
      });

    });
  });
});
