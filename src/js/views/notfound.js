/**
 * Created by jerek0 on 19/05/2015.
 */

let Backbone = require('backbone');

module.exports = Backbone.View.extend({
    el: "#content",
    
    initialize: function() {
        //this.render();
    },
    
    render: function(){
        this.$el.html("404 : NOT FOUND");
    }
    
})