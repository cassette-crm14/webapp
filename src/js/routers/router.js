/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');

module.exports = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'last-party/': 'lastParty',
        'my-parties/': 'myParties',
        'add-party/': 'addParty',
        'next-parties/': 'nextParties',
        '*notfound': 'notfound'
    },
    
    initialize: function(app) {
        this.app = app;
        Backbone.history.start();
    },
    
    home: function() {
        new this.app.HomeView();
    },

    lastParty: function() {
        new this.app.LastPartyView();
    },
    
    myParties: function() {
        new this.app.MyPartiesView();
    },

    addParty: function() {
        new this.app.AddPartyView();
    },

    nextParties: function() {
        new this.app.NextPartiesView();
    },
    
    notfound: function() {
        new this.app.NotFoundView();
    }
});