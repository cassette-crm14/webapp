/**
 * Created by jerek0 on 03/06/2015.
 */
    
let $ = require('jquery');
let gsap = require('gsap');
let templates = {
    'comments': require('../../htdocs/templates/popin/comments.hbs')
};


// TODO - Animations IN / OUT
    
class popinBox {
    constructor($context, template, data) {
        this.$context = $context;
        this.template = templates[template];
        this.data = data;
        this.animationDuration = 0.5;
        
        this.init();
    }
    
    init() {
        this.$overlay = $('<div class="popinOverlay z-index-50"></div>');
        this.$wrapper = $('<div class="popinWrapper position-center"><div class="popinClose">X</div></div>');
        this.$overlay.append(this.$wrapper);
        this.$wrapper[0].innerHTML+=this.template(this.data);
        
        this.$context.append(this.$overlay);
        gsap.set(this.$overlay, { opacity: 0 });
        gsap.set(this.$wrapper, { opacity: 0, y: "-60%" });
        this.open();
        
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
    
    open() {
        gsap.to(this.$overlay, this.animationDuration, { opacity: 1 });
        gsap.to(this.$wrapper, this.animationDuration, { opacity: 1, y: "-50%", delay: this.animationDuration / 2 });
    }
    
    close() {
        let scope = this;

        gsap.to(this.$wrapper, this.animationDuration/2, {
            opacity: 0,
            y: "-60%"
        });
        
        gsap.to(this.$overlay, this.animationDuration/2, {
            opacity: 0,
            delay: scope.animationDuration / 2,
            onComplete: function() {
                scope.$overlay.remove();
            } 
        });
    }
    
}

module.exports = popinBox;
