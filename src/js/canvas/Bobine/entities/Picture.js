/**
 * Created by jerek0 on 15/06/2015.
 */

let PartyItem = require('./PartyItem');
    
class Picture extends PartyItem {
    constructor(data, scene) {
        super(data, scene);
        
        if(this.data.animated) {
            this.imageSequence = [];
            for(let i = 0; i < this.data.total_of_frames; i++) {
                this.imageSequence.push(this.data.sequence_folder+i+'.jpg');
            }   
        }
        
        this.init();
    }
    
    init() {
        if(this.data.animated) {
            this.image = new PIXI.extras.MovieClip.fromImages(this.imageSequence);
            this.image.animationSpeed = 0.2;
            this.image.play();
        } else {
            this.image = new PIXI.Sprite.fromImage(this.data.src);
        }
        this.image.height = (this.image.height / this.image.width) * this.scene.dimensions.height * 0.4;
        this.image.width = this.scene.dimensions.height * 0.4;
        this.content.addChild(this.image);
        this.content.pivot = new PIXI.Point(this.content.width / 2, this.content.height / 2);
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
                mask.moveTo(this.image.width/2,0);
                mask.lineTo(this.image.width,this.image.height);
                mask.lineTo(0,this.image.height);
                mask.lineTo(this.image.width/2,0);
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
        
        super.addMask();
    }
}

module.exports = Picture;