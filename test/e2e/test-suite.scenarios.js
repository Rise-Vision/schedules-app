SigninScenarios = require('./cases/signin.js');
HomePageScenarios = require('./cases/homepage.js');
ScheduleListScenarios = require('./cases/schedulelist.js');
AddDistributionScenarios = require('./cases/add-distribution.js');
AddTimelineScenarios = require('./cases/add-timeline.js');
AddPresentationScenarios = require('./cases/add-presentation.js');
AddUrlScenarios = require('./cases/add-url.js');
PlaylistScenarios = require('./cases/playlist.js');
ScheduleAddScenarios = require('./cases/scheduleadd.js');

homePageScenarios = new HomePageScenarios();
signinScenarios = new SigninScenarios();
scheduleListScenarios = new ScheduleListScenarios();
addDistributionScenarios = new AddDistributionScenarios();
addTimelineScenarios = new AddTimelineScenarios();
addPresentationScenarios = new AddPresentationScenarios();
addUrlScenarios = new AddUrlScenarios();
playlistScenarios = new PlaylistScenarios();
scheduleAddScenarios = new ScheduleAddScenarios();