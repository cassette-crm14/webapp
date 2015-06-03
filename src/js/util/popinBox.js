/**
 * Created by jerek0 on 03/06/2015.
 */
    
let $ = require('jquery');
let templates = {
    'comments': require('../../htdocs/templates/popin/comments.hbs')
};


// TODO - Animations IN / OUT
    
class popinBox {
    constructor($context, template, data) {
        this.$context = $context;
        this.template = templates[template];
        this.data = data;
        
        this.init();
    }
    
    init() {
        this.$overlay = $('<div class="popinOverlay z-index-50"></div>');
        this.$wrapper = $('<div class="popinWrapper position-center"><div class="popinClose">X</div></div>');
        this.$overlay.append(this.$wrapper);
        this.$wrapper[0].innerHTML+=this.template(this.data);
        
        this.$context.append(this.$overlay);
        
        this.bindUIActions();
    }
    
    bindUIActions() {
        let scope = this;
        
        $('.popinClose', this.$wrapper).on('click', function() {
            console.log(scope.$wrapper);
            scope.close();
            scope = null;
        });
    }
    
    updateData(data) {
        this.data = data;
        this.$wrapper[0].innerHTML='<div class="popinClose">X</div>'+this.template(this.data);

        this.bindUIActions();
    }
    
    close() {
        this.$overlay.remove();
    }
    
}

module.exports = popinBox;
