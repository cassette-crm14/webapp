/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
let Logo = require('./zones/Logo');
let BobineWrapper = require('./zones/BobineWrapper');
    
class BobineScene {
    constructor($context, partyId) {
        this.partyId = partyId;
        this.party = window.dataManager.getPartyById(this.partyId);
        
        this.$context = $context;
        this.dimensions = {
            width: this.$context.innerWidth(),
            height: this.$context.innerHeight()
        };
        
        this.renderer =  window.BobineRenderer || PIXI.autoDetectRenderer(this.dimensions.width, this.dimensions.height, { transparent: true, antialias: true, resolution: 1 });
        //this.renderer = window.BobineRenderer || new PIXI.CanvasRenderer(this.dimensions.width, this.dimensions.height, { transparent: true, antialias: true, resolution: 1 });
        if(!window.BobineRenderer) window.BobineRenderer = this.renderer;
        
        
        this.stage = new PIXI.Container();
        this.$context.append(this.renderer.view);

        // ASSETS LOADING
        this.assetsLoader = new PIXI.loaders.Loader()
        this.assetsLoader.add(this.party.logo);
        this.assetsLoader.add(this.party.bobine);
        this.assetsLoader.add("/images/drink.png");
        this.assetsLoader.add("/images/meet.png");
        let items = window.dataManager.getHighlightedItemsFromParty(this.partyId);
        for(let i = 0; i < items.length; i++) {
            switch(items[i].type) {
                case "picture": 
                case "ponctual":
                    try {
                        this.assetsLoader.add(items[i].src);
                    } catch(e) {
                        console.warn(e);
                    }
                    break;
                default:
                    break;
            }
        }
        this.assetsLoader.once('complete' , this.init.bind(this));
        this.assetsLoader.load();

        requestAnimationFrame(this.animate.bind(this));
    }
    
    init() {
        // LOGO
        this.logo = new Logo(this);
        this.stage.addChild(this.logo);
        this.logo.animateIn();
        
        // BOBINE
        this.bobineWrapper = new BobineWrapper(this);
        this.stage.addChild(this.bobineWrapper);
        this.bobineWrapper.animateIn();
    }
    
    animate() {
        this.renderer.render(this.stage);
        requestAnimationFrame(this.animate.bind(this)); 
    }
}

module.exports = BobineScene;