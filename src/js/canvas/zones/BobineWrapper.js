/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');
let Picture = require('../entities/Picture');

class BobineWrapper extends PIXI.Container {
    constructor(scene) {
        super();
        
        this.scene = scene;
        
        this.picturesCoords = [
            {x: -100, y: -50, rotation:  0.3, mask: 1 },
            {x:  100, y: 100, rotation: -0.3, mask: 2 },
            {x: -100, y:  80, rotation:  0.3, mask: 3 },
            {x:  100, y: -10, rotation:  0.3, mask: 4 }
        ];

        this.init();
    }
    
    init() {
        
        // BACKGROUND
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x242530);
        this.background.drawCircle(this.scene.dimensions.width/2, this.scene.dimensions.height/2, this.scene.dimensions.height*0.3);
        this.addChild(this.background);
        
        // GENERATE ENTITIES
        this.itemsWrapper = new PIXI.Container();
        this.addChild(this.itemsWrapper);
        this.itemsWrapper.position.x = this.scene.dimensions.width / 2;
        this.itemsWrapper.position.y = this.scene.dimensions.height / 2;
        this.itemsWrapper.origin = {
            x: this.scene.dimensions.width / 2,
            y: this.scene.dimensions.height / 2
        };
        this.itemsData = window.dataManager.getHighlightedItemsFromParty(this.scene.partyId);
        this.items = [];
        let cpt = 0;
        for(let i = 0; i < this.itemsData.length; i++) {
            switch(this.itemsData[i].type) {
                case "picture":
                    this.items.push(new Picture(this.itemsData[i], this.scene));
                    break;
                default:
                    break;
            }
            if(this.items[cpt]) this.addItemToBobine(this.items[cpt]);
            cpt++;
        }
        
        // Interactivity
        this.interactive = true;
        this.mousemove = this.onMouseMove.bind(this);
    }
    
    addItemToBobine(item) {
        this.itemsWrapper.addChild(item);
        let coords = this.picturesCoords[this.items.length-1];
        item.position.x += coords.x;
        item.position.y += coords.y;
        item.content.rotation = coords.rotation;
        item.addMask(coords.mask);
        item.animateIn();
    }
    
    animateIn() {
        // BACKGROUND ANIMATION
        let animationDuration = 1;
        gsap.set(this.background.scale, { x: 0, y: 0 });
        gsap.to(this.background.scale, animationDuration, { x: 1, y: 1, delay: 1, ease: Elastic.easeOut.config(1, 0.9)});
        gsap.set(this.position, { x: this.scene.dimensions.width/2, y: this.scene.dimensions.height/2 });
        gsap.to(this.position, animationDuration, { x: 0, y: 0, delay: 1, ease: Elastic.easeOut.config(1, 0.9)});
    }
    
    onMouseMove(e) {
        this.itemsWrapper.position.x = this.itemsWrapper.origin.x - (e.data.global.x - (this.width / 2)) * 0.02;
        this.itemsWrapper.position.y = this.itemsWrapper.origin.y - (e.data.global.y - (this.height / 2)) * 0.02;
    }
}

module.exports = BobineWrapper;