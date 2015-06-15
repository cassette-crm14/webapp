/**
 * Created by jerek0 on 15/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');

class PartyItem extends PIXI.Container {
    constructor(data, scene) {
        super();

        this.data = data;
        this.scene = scene;
        this.content = new PIXI.Container();
        
        this.addChild(this.content);
        
        this.content.interactive = true;
        this.content.mouseover = this.onMouseOver.bind(this);
        this.content.mouseout = this.onMouseOut.bind(this);
    }
    
    animateIn() {
        gsap.set(this.content.scale, { x: 0, y: 0 });
        gsap.to(this.content.scale, 1, { x: 1, y: 1 , delay: 1.5, ease: Elastic.easeOut.config(1, 0.9) });
    }
    
    onMouseOver() {
        gsap.to(this.content.scale, 0.5, { x: 1.5, y: 1.5, ease: Power2.easeOut });
    }

    onMouseOut() {
        gsap.to(this.content.scale, 0.5, { x: 1, y: 1, ease: Power2.easeOut });
    }
}

module.exports = PartyItem;