/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../htdocs/templates/addParty.hbs');
let $ = require('jquery');
let clickToExpand = require('../util/clickToExpand');

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,

    initialize: function() {
        //this.render();
    },
    
    bindUIActions: function() {
        this.registerClickToExpand();
    },

    /*
     PAGE INTERFACE MANAGERS
     ##################### */

    /**
     * Manager of the top panel which is expandable *
     */
    registerClickToExpand: function() {
        $('.accordeon-item h3', this.$el).each(function(i, el) {
            new clickToExpand($(el));
        });
    },

    render: function() {
        this.$el.html(this.template());
        this.bindUIActions();
        return this;
    }
});
