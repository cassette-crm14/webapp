/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../../htdocs/templates/party/timeline.hbs');
let bottomMenu = require('../../../htdocs/templates/partials/bottomMenu.hbs');
let Handlebars = require('hbsfy/runtime');
let popinBox = require('../../util/popinBox');
let clickToExpand = require('../../util/clickToExpand');
let gsap = require('gsap');
let $ = require('jquery');

Handlebars.registerPartial('bottomMenu', bottomMenu);

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,
    
    partyId: 0,

    /**
     * Initialize this view * 
     * @param params
     */
    initialize: function(params) {
        this.partyId = params.id;
        this.party = window.dataManager.getPartyById(this.partyId);

        this.render();
    },

    /**
     * Renders this view with its handlebars template and given parameters *
     * @returns {exports}
     */
    render: function() {
        
        let params = {
            party: this.party,
            partyId: this.partyId
        };
        
        console.log('new timeline');
        
        this.$el.html(this.template(params));
        
        this.bindUIActions();
        
        return this;
    },

    /**
     * UIActions managers which will call specific UI Managers *
     */
    bindUIActions: function() {
        this.registerTimelineScroll();
        this.registerComments();
        this.registerHighlights();
        this.registerClickToExpand();
        this.registerScrollButtons();
    },

    /*
     PAGE INTERFACE MANAGERS
     ##################### */

    /**
     * Manager of the top panel which is expandable *
     */
    registerClickToExpand: function() {
        $('.btn-expand', this.$el).each(function(i, el) {
            new clickToExpand($(el));
        });
    },

    /*
     HORIZONTAL NAVIGATION
     ##################### */

    /**
     * Register the scroll buttons for horizontal navigation of the timeline *
     */
    registerScrollButtons: function() {
        let $scrollBtns = $('.btn-scroll', this.$el);
        let timelineWrapper = $('.timeline-wrapper')[0];

        $scrollBtns.on('click', function() {
            gsap.to(timelineWrapper, 0.5, { scrollLeft: "+="+($(this).hasClass('scroll-left') ? -200 : 200) });
        });
    },

    /**
     * Manager of the timeline horizontal scrolling with the mouse *
     */
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

    },

    /* 
     TIMELINE ITEMS MANAGERS
     ##################### */

    /**
     * Manager of the comments for each party item *
     */
    registerComments: function() {
        let scope = this;
        
        $('.toggle-comments', this.$el).on('click', function() {
            var itemId = $(this).attr('data-item-id');
            let popinComments = new popinBox(scope.$el, 'comments', scope.party.data[itemId]);
            $('.comments-post', popinComments.$wrapper).toggleClass('hidden', false);
            $('.submit-comment', popinComments.$wrapper).on('click', function() {
                if(!scope.party.data[itemId].comments) scope.party.data[itemId].comments = [];
                scope.party.data[itemId].comments.push({
                    name: window.dataManager.getProfile().firstname+' '+window.dataManager.getProfile().lastname,
                    content: $('textarea', popinComments.$wrapper).val(),
                    date: new Date()/1000,
                    src: window.dataManager.getProfile().picture
                });
                
                popinComments.updateData(scope.party.data[itemId]);
            });
        });
    },

    /**
     * Manager of the highlights toggling for each party item *
     */
    registerHighlights: function() {
        let scope = this;
        
        $('.toggle-highlight', this.$el).on('click', function() {
            scope.party.data[$(this).attr('data-item-id')].highlighted = !scope.party.data[$(this).attr('data-item-id')].highlighted;
            $(this).parents('.toggle-tooltip').toggleClass('highlighted');
        });
        
    }

});

