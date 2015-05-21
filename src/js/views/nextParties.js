/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../htdocs/templates/nextParties.hbs');

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template(window.cassetteData));
        return this;
    }
});
