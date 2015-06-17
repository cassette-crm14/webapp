/**
 * Created by jerek0 on 17/06/2015.
 */

let Backbone = require('backbone');
let $ = require('jquery');

Backbone.View.prototype.close = function(){

    this.remove();
    this.unbind();
    
    if (this.onClose){
        this.onClose();
    }

    $('body').append('<div id="content"></div>');
};