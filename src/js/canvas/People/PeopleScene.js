/**
 * Created by jerek0 on 18/06/2015.
 */

let PIXI = require('pixi.js');
let PeopleWrapper = require('./zones/PeopleWrapper');

class PeopleScene {
    constructor($context, partyId) {
        this.partyId = partyId;
        this.party = window.dataManager.getPartyById(this.partyId);
        this.profile = window.dataManager.getProfile();
        this.peopleCollection = window.dataManager.getMeetItemsFromParty(this.partyId);
        this.peopleCollection.splice(0,0,{
            src: this.profile.picture,
            name: this.profile.firstname + ' ' + this.profile.lastname
        });
        this.peopleCollection = this.peopleCollection.slice(0,4);
        this.peopleCollection.push({
            src: '/images/avatar1.jpg',
            disabled: true
        });
        this.peopleCollection.push({
            src: '/images/avatar2.jpg',
            disabled: true
        });
        this.peopleCollection.push({
            disabled: true
        });

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
        
        // GET FRIENDS DATA
        for(let i = 0; i < this.peopleCollection.length ; i ++ ) {
            try{
                this.assetsLoader.add(this.peopleCollection[i].src);
            } catch(e) {
                console.warn(e);
            }
        }
        
        this.assetsLoader.once('complete' , this.init.bind(this));
        this.assetsLoader.load();

        requestAnimationFrame(this.animate.bind(this));
    }

    init() {
        /*let graphics = new PIXI.Graphics();
        graphics.beginFill(0x00FF00);
        graphics.drawRect(0,0,50,50);
        this.stage.addChild(graphics);*/
        
        this.peopleWrapper = new PeopleWrapper(this, this.peopleCollection);
        this.stage.addChild(this.peopleWrapper);
        this.peopleWrapper.animateIn();
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

module.exports = PeopleScene;