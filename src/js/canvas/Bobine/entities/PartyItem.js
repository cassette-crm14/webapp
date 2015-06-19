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

        /*this.content.interactive = true;
        this.content.mouseover = this.onMouseOver.bind(this);
        this.content.mouseout = this.onMouseOut.bind(this);*/
        
        this.animationDurations = {
            mouseover: 0.5,
            in: 1
        };

        this.animationDelays = {
            mouseover: 0,
            in: 1.5
        };

        this.scaleValue = 0.8;
    }
    
    addMask() {
        if(this.content.mask) {
            this.content.mask.interactive = true;
            this.content.mask.mouseover = this.onMouseOver.bind(this);
            this.content.mask.mouseout = this.onMouseOut.bind(this);
        }
    }

    changeScale(scale) {
        this.scaleValue = this.scaleValue*scale;
    }
    
    animateIn() {
        gsap.set(this.content.scale, { x: 0, y: 0 });
        gsap.to(this.content.scale, this.animationDurations.in , { x: this.scaleValue, y: this.scaleValue, delay: this.animationDelays.in, ease: Elastic.easeOut.config(1, 0.9) });
    }
    
    onMouseOver() {
        gsap.to(this.content.scale, this.animationDurations.mouseover, { x: 1.5, y: 1.5, delay: this.animationDelays.mouseover, ease: Expo.easeOut });
    }

    onMouseOut() {
        gsap.to(this.content.scale, this.animationDurations.mouseover, { x: this.scaleValue, y: this.scaleValue, delay: this.animationDelays.mouseover, ease: Expo.easeOut });
    }
}

module.exports = PartyItem;