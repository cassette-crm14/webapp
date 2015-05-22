/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../htdocs/templates/home.hbs');
let $ = require('jquery');

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,

    initialize: function() {
        this.render();
        this.bindUIActions();
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },
    
    bindUIActions: function() {
        $('#login').on('click', function(e) {
            e.preventDefault(e);
            
            let scope = this;
            
            setTimeout(function() {
                window.location = $(scope).attr('href');
            },500);
        });
    }
});
