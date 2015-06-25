'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var SchedulesListPage = require('./pages/schedulesListPage.js');
var ScheduleAddPage = require('./pages/scheduleAddPage.js');
var helper = require('rv-common-e2e').helper;
var UrlModalPage = require('./pages/urlModalPage.js');

browser.driver.manage().window().setSize(1024, 768);
describe("Add URL to a schedule " +
  "As a user signed in " +
  "I would like to add URLs to a schedule ", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var schedulesListPage;
  var scheduleAddPage;
  var urlModalPage;

  before(function (){
    homepage = new HomePage();
    schedulesListPage = new SchedulesListPage();
    scheduleAddPage = new ScheduleAddPage();
    commonHeaderPage = new CommonHeaderPage();
    urlModalPage = new UrlModalPage();

    homepage.get();
    //wait for spinner to go away.
    browser.wait(function() {
      return element(by.css('.spinner-backdrop')).isDisplayed().then(function(result){return !result});
    }, 20000);
    commonHeaderPage.signin();
  });

  describe(" Given a user is adding a new schedule ", function() {
    before(function () {
      schedulesListPage.getScheduleAddButton().click();
    });

    describe('Given a user clicks on the Add Playlist Item Button', function () {
      before(function () {
        scheduleAddPage.getAddPlaylistItemButton().click();
      });
      it('should show url on the Add Playlist Item list', function () {
        expect(scheduleAddPage.getAddUrlItemButton().isDisplayed()).to.eventually.be.true;
      });

      it('should presentation button have a url text', function () {
        expect(scheduleAddPage.getAddUrlItemButton().getText()).to.eventually.equal('URL');
      });

      describe('Given a user clicks on the url button', function () {
        before(function () {
          scheduleAddPage.getAddUrlItemButton().click();
          helper.wait(urlModalPage.getAddUrlModal(), 'Add URL Modal');
        });

        it('should open the Add URL Modal', function () {
          expect(urlModalPage.getAddUrlModal().isDisplayed()).to.eventually.be.true;
        });

        it('should show modal title', function () {
          expect(urlModalPage.getModalTitle().getText()).to.eventually.equal('Add Playlist URL');
        });

        it('should show a URL text box', function () {
          expect(urlModalPage.getUrlInput().isDisplayed()).to.eventually.be.true;
        });

        it('should show the Storage selector', function () {
          expect(urlModalPage.getStorageSelectorIcon().isDisplayed()).to.eventually.be.true;
        });

        describe('Given the user enters a URL',function () {
          before(function () {
            urlModalPage.getUrlInput().sendKeys('http://risevision.com/content.html');
            urlModalPage.getUpdateButton().click();
          });
          it('should add the url item to the Playlist', function () {
            expect(scheduleAddPage.getPlaylistItems().get(0).isDisplayed()).to.eventually.be.true;
          });
        });

      });
    });
  });
});
