/**
 * Created by jerek0 on 04/06/2015.
 */
    
let $ = require('jquery');
    
class clickToExpand {
    constructor($el) {
        this.$el = $el;
        this.$target = $($el.attr('data-to-expand'));
        this.opened = false;
        
        this.bindUIActions();
    }
    
    bindUIActions() {
        this.$el.on('click', this.toggle.bind(this));
    }
    
    toggle() {
        this.$el.toggleClass('expanded');
        this.$target.slideToggle();
        
        /*if(this.opened) {
            this.close();
        } else {
            this.open();
        }*/
    }
    
    /*open() {
      
    }
    
    close() {
        
    }*/
    
}

module.exports = clickToExpand;