/**
 * Created by jerek0 on 18/06/2015.
 */

let Backbone = require('backbone');
let template = require('../../../htdocs/templates/party/souvenir.hbs');
let bottomMenu = require('../../../htdocs/templates/partials/bottomMenu.hbs');
let Handlebar = require('hbsfy/runtime');
let $ = require('jquery');
let Functions = require('../../util/functions');

Handlebar.registerPartial('bottomMenu', bottomMenu);

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,

    partyId: 0,

    initialize: function(params) {
        this.partyId = params.id;

        //this.render();

        Functions.changeHighlightedColor(window.dataManager.getPartyById(this.partyId).secondary_color);
    },

    bindUIActions: function() {

    },

    render: function() {

        let params = {
            party: window.dataManager.getPartyById(this.partyId),
            partyId: this.partyId
        };

        this.$el.html(this.template(params));

        $('#onglet-souvenir', this.$el).toggleClass('active');
        this.bindUIActions();

        return this;
    }
});
