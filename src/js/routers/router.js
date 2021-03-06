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
        'party/:id/people/': 'people',
        'party/:id/souvenir/': 'souvenir',
        'my-parties/': 'myParties',
        'add-party/': 'addParty',
        'next-parties/': 'nextParties',
        'welcome/': 'welcome',
        '*notfound': 'notfound'
    },
    
    initialize: function(app) {
        this.app = app;
        this.appView.scope = this;
        new this.app.views.Profile();
        Backbone.history.start();
        this.onChange();
        this.on("route", this.onChange);
    },

    appView: {
        scope: this,
        
        goTo: function(View, params, options) {
            let scope = this;
            let delay = 400;
            let lastDelay = 400;

            $('.pageLoader').toggleClass('active', true);

            if(options && options.longLoadIfReload && !this.currentView) {
                delay = 1000;
            }
            
            if(options && options.forceLongLoad) {
                delay = 1000;
                if (scope.currentView){
                    setTimeout(function() {
                        scope.currentView.close();
                        scope.currentView = null;
                    }, 250);
                }
            }

            setTimeout(function() {
                if (scope.currentView){
                    scope.currentView.close();
                }

                scope.currentView = new View(params);
                scope.currentView.render();

                setTimeout(function() {
                    $('.pageLoader').toggleClass('active', false);
                }, lastDelay);
            }, delay);

        }
    },
    
    home : function() {
        this.appView.goTo(this.app.views.Home);
    },

    welcome: function() {
        this.appView.goTo(this.app.views.Welcome, null, { forceLongLoad: true });
    },

    party: function(id) {
        if(_.isEmpty(id)) id = 0;

        this.appView.goTo(this.app.views.party.Bobine, {id: id}, {longLoadIfReload: true});
    },
    
    timeline: function(id) {
        if(_.isEmpty(id)) id = 0;

        this.appView.goTo(this.app.views.party.Timeline, {id: id});
    },
    
    people: function(id) {
        if(_.isEmpty(id)) id = 0;

        this.appView.goTo(this.app.views.party.People, {id: id}, {longLoadIfReload: true});
    },

    souvenir: function(id) {
        if(_.isEmpty(id)) id = 0;

        this.appView.goTo(this.app.views.party.Souvenir, {id: id});
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
            setTimeout(function() {
                $('body').toggleClass('logged-out', true);
            }, 500);
        } else {
            setTimeout(function() {
                $('body').toggleClass('logged-out', false);
            }, 500);
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