/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
let Logo = require('./zones/Logo');
    
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
        this.logo = new Logo(this);
    }
    
    animate() {
        this.renderer.render(this.stage);
        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = BobineScene;