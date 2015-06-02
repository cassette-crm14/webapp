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
app.views.party.Bobine = require('./views/party/bobine');
app.views.party.Timeline = require('./views/party/timeline');
app.views.MyParties = require('./views/myParties');
app.views.AddParty = require('./views/addParty');
app.views.NextParties = require('./views/nextParties');
app.views.NotFound = require('./views/notfound');

app.views.Profile = require('./views/profile');

// Router
app.router = require('./routers/router');

window.cassetteData = require('./data.json');

// launch
window.cassette = new app.router(app);
