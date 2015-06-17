/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let _ = require('underscore');
let $ = require('jquery');

module.exports = Backbone.Router.extend({
    routes: {
        '' : 'home',
        'party/': 'party',
        'party/:id': 'party',
        'party/:id/timeline/': 'timeline',
        'my-parties/': 'myParties',
        'add-party/': 'addParty',
        'next-parties/': 'nextParties',
        '*notfound': 'notfound'
    },
    
    appView: {
        goTo: function(View, params) {
            if (this.currentView){
                this.currentView.close();
            }

            this.currentView = new View(params);
            this.currentView.render();
        }
    },
    
    initialize: function(app) {
        this.app = app;
        new this.app.views.Profile();
        Backbone.history.start();
        this.onChange();
        this.on("route", this.onChange);
    },
    
    home : function() {
        this.appView.goTo(this.app.views.Home);
    },

    party: function(id) {
        if(_.isEmpty(id)) id = 0;

        this.appView.goTo(this.app.views.party.Bobine, {id: id});
    },
    
    timeline: function(id) {
        if(_.isEmpty(id)) id = 0;

        this.appView.goTo(this.app.views.party.Timeline, {id: id});
    },
    
    myParties: function() {
        this.appView.goTo(this.app.views.MyParties);
    },

    addParty: function() {
        this.appView.goTo(this.app.views.AddParty);
    },

    nextParties: function() {
        this.appView.goTo(this.app.views.NextParties);
    },
    
    notfound: function() {
        this.appView.goTo(this.app.views.NotFound);
    },
    
    onChange: function() {
        //console.log(route);
        //console.log(window.location.hash);
        
        // TODO - Arranger ça parceque là c'est dégueulasse :)
        
        $('.lateral-menu li a').toggleClass('current',false);

        if(window.location.hash == "" || window.location.hash == "#") {
            $('body').toggleClass('logged-out', true);
        } else {
            $('body').toggleClass('logged-out', false);
        } 
        
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