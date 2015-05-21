/**
 * Created by jerek0 on 07/05/2015.
 */

let app = {
    views: {}
};

// Views
app.views.Bobine = require('./views/party/bobine');
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
