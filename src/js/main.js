/**
 * Created by jerek0 on 07/05/2015.
 */

let app = {};

// Views
app.HomeView = require('./views/home');
app.LastPartyView = require('./views/lastParty');
app.MyPartiesView = require('./views/myParties');
app.AddPartyView = require('./views/addParty');
app.NextPartiesView = require('./views/nextParties');
app.NotFoundView = require('./views/notfound');

// Router
app.router = require('./routers/router');

// launch
new app.router(app);
