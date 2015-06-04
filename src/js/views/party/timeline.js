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
        this.registerComments();
        this.registerHighlights();
        this.registerClickToExpand();
        this.registerScrollButtons();
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
        
    },
    
    registerComments: function() {
        let scope = this;
        
        $('.toggle-comments', this.$el).on('click', function() {
            var itemId = $(this).attr('data-item-id');
            let popinComments = new popinBox(scope.$el, 'comments', window.cassetteData.profile.parties[scope.partyId].data[itemId]);
            $('.submit-comment', popinComments.$wrapper).on('click', function() {
                if(!window.cassetteData.profile.parties[scope.partyId].data[itemId].comments) window.cassetteData.profile.parties[scope.partyId].data[itemId].comments = [];
                window.cassetteData.profile.parties[scope.partyId].data[itemId].comments.push({
                    name: window.cassetteData.profile.firstname+' '+window.cassetteData.profile.lastname, 
                    content: $('textarea', popinComments.$wrapper).val(),
                    date: new Date()/1000,
                    src: window.cassetteData.profile.picture
                });
                
                popinComments.updateData(window.cassetteData.profile.parties[scope.partyId].data[itemId]);
            });
        });
    },
    
    registerHighlights: function() {
        let scope = this;
        
        $('.toggle-highlight', this.$el).on('click', function() {
            window.cassetteData.profile.parties[scope.partyId].data[$(this).attr('data-item-id')].highlighted = !window.cassetteData.profile.parties[scope.partyId].data[$(this).attr('data-item-id')].highlighted;
            console.log($(this).parent('.toggle-tooltip'));
            $(this).parents('.toggle-tooltip').toggleClass('highlighted');
        });
        
    },
    
    registerClickToExpand: function() {
        $('.btn-expand', this.$el).each(function(i, el) {
            new clickToExpand($(el));
        });
    },
    
    registerScrollButtons: function() {
        let $scrollBtns = $('.btn-scroll', this.$el);
        let timelineWrapper = $('.timeline-wrapper')[0];
        
        $scrollBtns.on('click', function() {

            gsap.to(timelineWrapper, 0.5, { scrollLeft: "+="+($(this).hasClass('scroll-left') ? -200 : 200) });
        });
        
        console.log(gsap);
    }
});
