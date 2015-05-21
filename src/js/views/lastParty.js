/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../htdocs/templates/lastParty.hbs');
let bottomMenu = require('../../htdocs/templates/bottomMenu.hbs');
let Handlebar = require('hbsfy/runtime');

Handlebar.registerPartial('bottomMenu', bottomMenu);

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template({ name: "Jérémy", baseUrl: '#/last-party' }));
        return this;
    }
});
