'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var SchedulesListPage = require('./../pages/schedulesListPage.js');
var helper = require('rv-common-e2e').helper;

var ScheduleListScenarios = function() {

  describe("In order to manage schedules " +
    "As a user signed in " +
    "I would like to see a list of my schedules", function () {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var commonHeaderPage;
    var schedulesListPage;

    before(function () {
      homepage = new HomePage();
      schedulesListPage = new SchedulesListPage();
      commonHeaderPage = new CommonHeaderPage();

      homepage.get();
      //wait for spinner to go away.
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
        commonHeaderPage.signin();
      });
    });

    it('should show schedules list page', function () {
      expect(schedulesListPage.getSchedulesAppContainer().isPresent()).to.eventually.be.true;
    });

    it('should show Schedules as title', function () {
      expect(schedulesListPage.getTitle().isPresent()).to.eventually.be.true;
      expect(schedulesListPage.getTitle().getText()).to.eventually.equal('Schedules');
    });

    it('should show the search bar', function () {
      expect(schedulesListPage.getSearchFilter().isPresent()).to.eventually.be.true;
    });

    it('should show schedule list table', function () {
      expect(schedulesListPage.getSchedulesListTable().isPresent()).to.eventually.be.true;
    });

    it('should show schedule add button', function () {
      expect(schedulesListPage.getScheduleAddButton().isPresent()).to.eventually.be.true;
      expect(schedulesListPage.getScheduleAddButton().getText()).to.eventually.equal('Add Schedule');
    });

    it('should show schedule list table header Name', function () {
      expect(schedulesListPage.getTableHeaderName().isPresent()).to.eventually.be.true;
      expect(schedulesListPage.getTableHeaderName().getText()).to.eventually.equal('Name');
    });

    it('should show schedule list table header Last Modified', function () {
      expect(schedulesListPage.getTableHeaderChangeDate().isPresent()).to.eventually.be.true;
      expect(schedulesListPage.getTableHeaderChangeDate().getText()).to.eventually.equal('Last Modified');
    });

  });
};
module.exports = ScheduleListScenarios;