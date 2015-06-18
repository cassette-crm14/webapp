/**
 * Created by jerek0 on 18/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');
    
class People extends PIXI.Container {
    constructor(data, scene) {
        super();
        
        this.data = data;
        this.scene = scene;
        
        if(this.data.src) {
            this.image = new PIXI.Sprite.fromImage(this.data.src);
            this.image.height = (this.image.height / this.image.width) * this.scene.dimensions.height * 0.05;
            this.image.width = this.scene.dimensions.height * 0.05;
            if (this.data.disabled) this.image.alpha = 0.5;
        } else {
            this.image = new PIXI.Graphics();
            this.image.beginFill(0xFFFFFF);
            this.image.drawRect(0,0, this.scene.dimensions.height * 0.05, this.scene.dimensions.height * 0.05);
            this.image.beginFill("0x"+this.scene.party.color.substr(1), 0.9);
            this.image.drawRect(0,0, this.scene.dimensions.height * 0.05, this.scene.dimensions.height * 0.05);
        }

        this.background = new PIXI.Graphics();
        this.background.beginFill(0x000000, 0.2);
        this.background.drawCircle(this.image.width/2, this.image.height/2, this.image.width/2+(this.scene.dimensions.height*0.005));

        if(this.data.name) {
            this.text = new PIXI.Text(this.data.name, { font: "bold 72px blogger_sanslight", fill: "#FFF", align: "left" });
            this.text.position.x = this.background.width + this.scene.dimensions.height*0.01;
            this.text.scale.x = 0.2;
            this.text.scale.y = 0.2;
            this.text.position.y = this.background.height/2 - this.text.height*2/3;
            this.text.alpha = 0;
            this.addChild(this.text);

            this.textGraphics = new PIXI.Graphics();
            this.textGraphics.beginFill(0xFFFFFF, 1);
            this.textGraphics.drawRoundedRect(this.text.position.x, this.text.position.y-this.scene.dimensions.height*0.01, this.scene.dimensions.height*0.02, this.scene.dimensions.height*0.0025, this.scene.dimensions.height*0.00125);
            this.textGraphics.drawRoundedRect(this.text.position.x, this.text.position.y+this.text.height+this.scene.dimensions.height*0.01, this.scene.dimensions.height*0.02, this.scene.dimensions.height*0.0025, this.scene.dimensions.height*0.00125);
            this.textGraphics.alpha = 0;
            this.addChild(this.textGraphics);
        }

        this.addChild(this.background);
        this.addChild(this.image);
        this.pivot = new PIXI.Point(this.image.width/2,this.image.height/2);
        
        this.addMask();
        
        if(!this.data.disabled) {
            this.image.mask.interactive = true;
            this.image.mask.mouseover = this.onMouseOver.bind(this);
            this.image.mask.mouseout = this.onMouseOut.bind(this);
        }
    }
    
    addMask() {
        let mask = new PIXI.Graphics();
        mask.beginFill(0x00FF00);
        mask.drawCircle(this.image.width/2,this.image.height/2,this.image.width/2);
        this.addChild(mask);
        this.image.mask = mask;
    }
    
    onMouseOver() {
        gsap.to(this.scale , 1, { x: 2.5, y: 2.5, ease: Elastic.easeInOut.config(1, 1) });
        if(this.text) gsap.to([this.text, this.textGraphics] , 0.5, { alpha: 1, delay: 0.5});
    }
    
    onMouseOut() {
        gsap.to(this.scale , 1, { x: 1, y: 1, ease: Elastic.easeInOut.config(1, 1) });
        if(this.text) gsap.to([this.text, this.textGraphics] , 0.5, { alpha: 0 });
    }
}

module.exports = People;