/**
 * Created by jerek0 on 15/06/2015.
 */

let PartyItem = require('./PartyItem');
    
class Picture extends PartyItem {
    constructor(data, scene) {
        super(data, scene);
        
        this.init();
    }
    
    init() {
        this.image = new PIXI.Sprite.fromImage(this.data.src);
        this.image.height = (this.image.height / this.image.width) * this.scene.dimensions.width*0.2;
        this.image.width = this.scene.dimensions.width*0.2;
        this.content.addChild(this.image);
        this.content.pivot = new PIXI.Point(this.content.width/2, this.content.height/2);
    }
    
    addMask(type) {
        let mask = new PIXI.Graphics();
        mask.beginFill(0xFF0000, 1);
        
        switch(type) {
            case 1:
                mask.moveTo(0,0);
                mask.lineTo(10,this.image.height);
                mask.lineTo(this.image.width,this.image.height/2);
                mask.lineTo(0,0);       
                break;
            case 2:
                mask.moveTo(this.image.width,0);
                mask.lineTo(this.image.width-20,this.image.height);
                mask.lineTo(0,this.image.height/2);
                mask.lineTo(this.image.width,0);
                break;
            case 3:
                mask.moveTo(0,0);
                mask.lineTo(10,this.image.height);
                mask.lineTo(this.image.width,this.image.height/2);
                mask.lineTo(0,0);
                break;
            case 4:
                mask.moveTo(0,0);
                mask.lineTo(10,this.image.height);
                mask.lineTo(this.image.width,this.image.height/2);
                mask.lineTo(0,0);
                break;
        }
        this.content.addChild(mask);
        this.content.mask = mask;
    }
}

module.exports = Picture;