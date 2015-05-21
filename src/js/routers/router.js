/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let _ = require('underscore');
let $ = require('jquery');

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
        this.onChange();
        this.on("route", this.onChange);
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
    },
    
    onChange: function() {
        //console.log(route);
        //console.log(window.location.hash);
        
        // TODO - Arranger ça parceque là c'est dégueulasse :)
        
        $('.lateral-menu li a').toggleClass('current',false);

        if(window.location.hash.indexOf('#/party/0') === 0) {
            $('.lateral-menu li:first-child a').toggleClass('current',true);
        } else if(window.location.hash.indexOf('#/my-parties/') === 0 || window.location.hash.indexOf('#/party/') === 0) {
            $('.lateral-menu li:nth-child(2) a').toggleClass('current',true);
        } else if(window.location.hash.indexOf('#/add-party/') === 0) {
            $('.lateral-menu li:nth-child(3) a').toggleClass('current',true);
        } else if(window.location.hash.indexOf('#/next-parties/') === 0) {
            $('.lateral-menu li:nth-child(4) a').toggleClass('current',true);
        }
    }
});