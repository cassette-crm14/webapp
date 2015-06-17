/**
 * Created by jerek0 on 17/06/2015.
 */

let PartyItem = require('./PartyItem');
let gsap = require('gsap');
    
class Video extends PartyItem {
    constructor(data,scene){
        super(data,scene);
        
        this.init();
    }
    
    init() {
        let videoTexture = new PIXI.Texture.fromVideo(this.data.src);
        this.image = new PIXI.Sprite(videoTexture);
        this.image.texture.baseTexture.source.loop = true;
        this.image.texture.baseTexture.source.muted = true;
        this.image.height = (720 / 1280) * this.scene.dimensions.height*0.5;
        this.image.width = this.scene.dimensions.height*0.5;
        this.content.addChild(this.image);
        this.content.pivot = new PIXI.Point(this.content.width/2, this.content.height/2);
    }
    
    addMask() {
        let mask = new PIXI.Graphics();
        
        mask.lineStyle(this.image.height*0.6, 0xFF0000);
        mask.arc(0,0,this.image.width/2, -Math.PI/2, 0);
        mask.position.x = this.image.width / 2;
        mask.position.y = this.image.height + this.image.height*0.3;
        mask.rotation = -Math.PI/4;
        
        this.content.addChild(mask);
        this.content.mask = mask;

        //super.addMask();
        this.content.interactive = true;
        this.content.mouseover = this.onMouseOver.bind(this);
        this.content.mouseout = this.onMouseOut.bind(this);
    }
    
    onMouseOver() {
        super.onMouseOver();
        
        this.image.texture.baseTexture.source.muted = false;
        gsap.set(this.image.texture.baseTexture.source, { volume: 0 });
        gsap.to(this.image.texture.baseTexture.source, 0.5, { volume: 1 });
    }

    onMouseOut() {
        let scope = this;
        super.onMouseOut();

        gsap.to(this.image.texture.baseTexture.source, 0.5, { volume: 0, onComplete: function() {
            scope.image.texture.baseTexture.source.muted = true;
        } });
    }
}

module.exports = Video;