/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
let Logo = require('./zones/Logo');
let BobineWrapper = require('./zones/BobineWrapper');
let MovementsWrapper = require('./zones/MovementsWrapper');
    
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
        this.assetsLoader.add("images/drink.png");
        this.assetsLoader.add("images/meet.png");
        let items = window.dataManager.getHighlightedItemsFromParty(this.partyId);
        for(let i = 0; i < items.length; i++) {
            switch(items[i].type) {
                case "picture": 
                case "ponctual":
                case "music":
                case "video":
                    try {
                        if(items[i].animated) {
                            for(let i = 0; i < items[i].total_of_frames; i++) {
                                this.assetsLoader.add(items[i].sequence_folder+i+'.jpg');
                            }
                        }
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

        // MOVEMENTS
        this.movementsWrapper = new MovementsWrapper(this);
        this.stage.addChild(this.movementsWrapper);
        this.movementsWrapper.origin = {
            x: this.dimensions.width / 2,
            y: this.dimensions.height / 2 - this.dimensions.height*0.05
        }
        this.movementsWrapper.position.x = this.movementsWrapper.origin.x;
        this.movementsWrapper.position.y = this.movementsWrapper.origin.y;
        this.movementsWrapper.animateIn();
        
        // BOBINE
        this.bobineWrapper = new BobineWrapper(this);
        this.stage.addChild(this.bobineWrapper);
        this.bobineWrapper.animateIn();
    }
    
    animate() {
        this.renderer.render(this.stage);
        requestAnimationFrame(this.animate.bind(this)); 
    }
    
    onClose() {
        this.stage.removeAllListeners();
        this.stage.removeChildren();
    }
}

module.exports = BobineScene;