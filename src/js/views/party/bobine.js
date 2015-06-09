/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');
let template = require('../../../htdocs/templates/party/bobine.hbs');
let bottomMenu = require('../../../htdocs/templates/partials/bottomMenu.hbs');
let Handlebar = require('hbsfy/runtime');
let $ = require('jquery');

Handlebar.registerPartial('bottomMenu', bottomMenu);

module.exports = Backbone.View.extend({

    el: '#content',

    template: template,
    
    partyId: 0,

    initialize: function(params) {
        this.partyId = params.id;
        
        this.render();

        $('#onglet-bobine', this.$el).toggleClass('active');
        this.bindUIActions();
    },

    bindUIActions: function() {
    
    },
    
    render: function() {

        let params = {
            party: window.dataManager.getPartyById(this.partyId),
            partyId: this.partyId
        };
        
        this.$el.html(this.template(params));
        return this;
    }
});
