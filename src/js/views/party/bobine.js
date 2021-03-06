/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../../htdocs/templates/party/bobine.hbs');
let bottomMenu = require('../../../htdocs/templates/partials/bottomMenu.hbs');
let Handlebar = require('hbsfy/runtime');
let $ = require('jquery');
let BobineScene = require('../../canvas/Bobine/BobineScene');
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
        this.initCanvas();
    },
    
    initCanvas: function() {
        this.canvas = new BobineScene($('.party-wrapper', this.$el), this.partyId);
    },
    
    render: function() {

        let params = {
            party: window.dataManager.getPartyById(this.partyId),
            partyId: this.partyId
        };
        
        this.$el.html(this.template(params));

        $('#onglet-bobine', this.$el).toggleClass('active');
        this.bindUIActions();
        
        return this;
    },
    
    onClose: function() {
        this.canvas.onClose();
        //delete(this.canvas);
    }
});
