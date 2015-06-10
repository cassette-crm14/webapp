/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');
    
class BobineScene {
    constructor($context, party) {
        this.party = party;
        this.$context = $context;
        this.dimensions = {
            width: this.$context.innerWidth(),
            height: this.$context.innerHeight()
        };
        this.renderer = PIXI.autoDetectRenderer(this.dimensions.width, this.dimensions.height, { transparent: true, resolution: 2 });
        this.stage = new PIXI.Container();
        this.$context.append(this.renderer.view);

        this.assetsLoader = new PIXI.loaders.Loader()
        this.assetsLoader.add(this.party.logo);
        this.assetsLoader.once('complete' , this.init.bind(this));
        this.assetsLoader.load();

        requestAnimationFrame(this.animate.bind(this));
    }
    
    init() {
        
        // TODO - Make a dedicated zone for the logo
        
        this.logo = new PIXI.Sprite.fromImage(this.party.logo);
        this.logo.scale = new PIXI.Point(0.5,0.5);
        this.stage.addChild(this.logo);
        this.logo.height = (this.logo.height / this.logo.width) * 150;
        this.logo.width = 150;
        this.logo.position.x = this.dimensions.width/2 - this.logo.width/2;
        
        let logoAnimationDuration = 2;
        gsap.set(this.logo.position, { y: this.dimensions.height });
        gsap.to(this.logo.position, logoAnimationDuration, { y: this.dimensions.height - this.logo.height - 20, ease: Power4.easeOut });
        gsap.set(this.logo, { alpha: 0 });
        gsap.to(this.logo, logoAnimationDuration, { alpha: 1, ease: Power4.easeOut });
    }
    
    animate() {

        this.renderer.render(this.stage);
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = BobineScene;