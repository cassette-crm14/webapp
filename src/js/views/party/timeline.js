/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../../htdocs/templates/party/timeline.hbs');
let bottomMenu = require('../../../htdocs/templates/partials/bottomMenu.hbs');
let Handlebars = require('hbsfy/runtime');
let $ = require('jquery');

Handlebars.registerPartial('bottomMenu', bottomMenu);

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,
    
    partyId: 0,

    initialize: function(params) {
        this.partyId = params.id;
        
        this.render();
    },

    render: function() {
        
        let params = {
            party: window.cassetteData.profile.parties[this.partyId],
            partyId: this.partyId
        };
        
        this.$el.html(this.template(params));
        
        this.bindUIActions();
        
        return this;
    },
    
    bindUIActions: function() {
        this.registerTimelineScroll();
    },
    
    registerTimelineScroll: function() {
        let curPos = 0,
            curDown = false,
            timelineWrapper = $('.timeline-wrapper')[0];

        timelineWrapper.addEventListener('mousedown', function(e) {
            curDown = true;
            curPos = e.pageX;
        });

        timelineWrapper.addEventListener('mouseup', function(e) {
            curDown = false;
        });

        timelineWrapper.addEventListener('mousemove', function(e) {
            if(curDown === true) {
                timelineWrapper.scrollLeft = timelineWrapper.scrollLeft + (curPos - e.pageX);
                curPos -= curPos - e.pageX;
            }
        });
        
    }
});
