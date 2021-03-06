/**
 * Created by jerek0 on 07/05/2015.
 */

let app = {
    views: {
        party: {}
    }
};

require('./util/handlebarsHelpers');

// Views
app.views.Home = require('./views/home');
app.views.Welcome = require('./views/welcome');
app.views.party.Bobine = require('./views/party/bobine');
app.views.party.Timeline = require('./views/party/timeline');
app.views.party.People = require('./views/party/people');
app.views.party.Souvenir = require('./views/party/souvenir');
app.views.MyParties = require('./views/myParties');
app.views.AddParty = require('./views/addParty');
app.views.NextParties = require('./views/nextParties');
app.views.NotFound = require('./views/notfound');
app.views.Profile = require('./views/profile');

require('./views/ViewEnhancer');

// DATA
window.cassetteData = require('./data.json');
window.dataManager = require('./util/dataManager');
window.dataManager.init();

// Router
app.router = require('./routers/router');

// launch
window.cassette = new app.router(app);
window.cassette.app = app;


