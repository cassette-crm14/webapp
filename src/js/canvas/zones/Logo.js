/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');

class Logo extends PIXI.Sprite {
    constructor(scene) {
        super();

        this.scene = scene;
       
        this.texture = new PIXI.Texture.fromImage(this.scene.party.logo);
        this.scale = new PIXI.Point(0.5,0.5);
        this.scene.stage.addChild(this);
        this.height = (this.height / this.width) * 150;
        this.width = 150;
        this.position.x = this.scene.dimensions.width/2 - this.width/2;
        
        this.animateIn();
    }
    
    animateIn() {
        let logoAnimationDuration = 2;
        gsap.set(this.position, { y: this.scene.dimensions.height });
        gsap.to(this.position, logoAnimationDuration, { y: this.scene.dimensions.height - this.height - 20, ease: Power4.easeOut });
        gsap.set(this, { alpha: 0 });
        gsap.to(this, logoAnimationDuration, { alpha: 1, ease: Power4.easeOut });
    }
    
}

module.exports = Logo;