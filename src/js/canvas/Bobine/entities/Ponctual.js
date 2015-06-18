/**
 * Created by jerek0 on 16/06/2015.
 */

let PartyItem = require("./PartyItem");
let gsap = require('gsap');
    
class Ponctual extends PartyItem {
    constructor(data, scene) {
        super(data, scene);
        
        this.animationDelays.in += 0.25;
        this.scaleValue = 0.8;
        
        this.init();
    }

    init() {
        this.image = new PIXI.Sprite.fromImage(this.data.src);
        this.image.height = (this.image.height / this.image.width) * this.scene.dimensions.height*0.12;
        this.image.width = this.scene.dimensions.height*0.12;
        this.content.addChild(this.image);
        this.content.pivot = new PIXI.Point(this.content.width/2, this.content.height/2);
        
        this.pastille = new PIXI.Container();
        this.pastilleGraphics = new PIXI.Graphics();
        this.pastilleGraphics.beginFill("0x"+this.scene.party.secondary_color.substring(1));
        this.pastilleGraphics.drawCircle(15,15,15);
        this.pastille.addChild(this.pastilleGraphics);
        this.addChild(this.pastille);
        this.pastille.position.x = this.content.width/3;
        this.pastille.position.y = -this.content.height/3;
        this.pastille.pivot = new PIXI.Point(this.pastille.width/2, this.pastille.height/2);
    }
    
    addMask() {
        let mask = new PIXI.Graphics();
        mask.beginFill(0x00FF00);
        mask.drawCircle(this.image.width/2, this.image.height/2, this.image.width/2);
        this.content.addChild(mask);
        this.content.mask = mask;
        
        super.addMask();
    }
    
    changeScale(scale) {
        super.changeScale(scale);

        this.pastille.position.x = this.content.width*this.scaleValue/3;
        this.pastille.position.y = -this.content.height*this.scaleValue/3;
    }
    
    animateIn() {
        super.animateIn();
        
        gsap.set(this.pastille.scale, { x: 0, y: 0 });
        gsap.to(this.pastille.scale, this.animationDurations.in , { x: this.scaleValue, y: this.scaleValue, delay: this.animationDelays.in, ease: Elastic.easeOut.config(1, 0.9) });
    }

    onMouseOver() {
        super.onMouseOver();
        
        gsap.to(this.pastille.scale, this.animationDurations.mouseover, { x: 0, y: 0, delay: this.animationDelays.mouseover, ease: Power2.easeOut });
    }

    onMouseOut() {
        super.onMouseOut();

        gsap.to(this.pastille.scale, this.animationDurations.mouseover, { x: this.scaleValue, y: this.scaleValue, delay: this.animationDelays.mouseover, ease: Power2.easeOut });
    }
    
}

module.exports = Ponctual;