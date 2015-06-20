/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../htdocs/templates/nextParties.hbs');
let $ = require('jquery');

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,

    initialize: function() {
        //this.render();
    },
    
    bindUIActions: function() {
        this.registerPartyFilters();
    },
    
    registerPartyFilters: function() {
        let scope = this;
        let $filters = $('.filter', this.$el);
        $filters.on('click', function(e) {
            e.preventDefault();
            
            let type = $(this).attr('data-type');
            $(this).toggleClass('btn-secondary');
            $(this).toggleClass('btn-primary');
            $('.party-type-'+type, scope.$el).toggleClass('hidden');
        });
    },

    render: function() {
        this.$el.html(this.template(window.dataManager.getData()));
        
        this.bindUIActions();
        
        return this;
    }
});
