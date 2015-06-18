/**
 * Created by jerek0 on 18/06/2015.
 */

let Backbone = require('backbone');
let template = require('../../../htdocs/templates/party/people.hbs');
let bottomMenu = require('../../../htdocs/templates/partials/bottomMenu.hbs');
let Handlebar = require('hbsfy/runtime');
let $ = require('jquery');
let Functions = require('../../util/functions');
let clickToExpand = require('../../util/clickToExpand');
let PeopleScene = require('../../canvas/People/PeopleScene');

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
        this.initCanvas();
        this.registerClickToExpand();
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

    initCanvas: function() {
        this.canvas = new PeopleScene($('.party-wrapper', this.$el), this.partyId);
    },

    render: function() {

        let params = {
            party: window.dataManager.getPartyById(this.partyId),
            partyId: this.partyId
        };

        this.$el.html(this.template(params));

        $('#onglet-people', this.$el).toggleClass('active');
        this.bindUIActions();

        return this;
    },

    onClose: function() {
        this.canvas.onClose();
        //delete(this.canvas);
    }
});
