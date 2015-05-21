/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let _ = require('underscore');

module.exports = Backbone.Router.extend({
    routes: {
        '' : 'party',
        'party/': 'party',
        'party/:id': 'party',
        'my-parties/': 'myParties',
        'add-party/': 'addParty',
        'next-parties/': 'nextParties',
        '*notfound': 'notfound'
    },
    
    initialize: function(app) {
        this.app = app;
        new this.app.views.Profile();
        Backbone.history.start();
    },

    party: function(id) {
        if(_.isEmpty(id)) id = 0;
        
        new this.app.views.Bobine({id: id});
    },
    
    myParties: function() {
        new this.app.views.MyParties();
    },

    addParty: function() {
        new this.app.views.AddParty();
    },

    nextParties: function() {
        new this.app.views.NextParties();
    },
    
    notfound: function() {
        new this.app.views.NotFound();
    }
});