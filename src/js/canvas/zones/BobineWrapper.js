/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');
let Picture = require('../entities/Picture');
let Ponctual = require('../entities/Ponctual');
let Meet = require('../entities/Meet');
let Drink = require('../entities/Drink');
let Music = require('../entities/Music');
let Video = require('../entities/Video');

class BobineWrapper extends PIXI.Container {
    constructor(scene) {
        super();
        
        this.scene = scene;
        this.coords = this.scene.party.coords;

        this.init();
    }
    
    init() {
        
        // BACKGROUND
        this.background = new PIXI.Sprite.fromImage(this.scene.party.bobine);
        this.background.height = (this.background.height / this.background.width) * (this.scene.dimensions.height*0.6);
        this.background.width = (this.scene.dimensions.height*0.6);
        this.background.anchor.x = 0.5;
        this.background.anchor.y = 0.5;
        this.background.position.x = this.scene.dimensions.width / 2;
        this.background.position.y = this.scene.dimensions.height / 2;
        this.addChild(this.background);
        this.background.maxScale = JSON.parse(JSON.stringify(this.background.scale));

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
        this.items = {
            picture: [],
            ponctual: [],
            video: [],
            music: []
        };

        // Add each entity to the scene
        for(let i = 0; i < this.itemsData.length; i++) {
            let item;
            switch(this.itemsData[i].type) {
                case "picture":
                    item = new Picture(this.itemsData[i], this.scene);
                    break;
                case "ponctual":
                    if(this.itemsData[i].value == "meet") item = new Meet(this.itemsData[i], this.scene);
                    if(this.itemsData[i].value == "beer") item = new Drink(this.itemsData[i], this.scene);
                    break;
                case "music":
                    item = new Music(this.itemsData[i], this.scene);
                    break;
                case "video":
                    item = new Video(this.itemsData[i], this.scene);
                    break;
                default:
                    break;
            }
            if(item) {
                this.items[this.itemsData[i].type].push(item);
                this.addItemToBobine(this.items[this.itemsData[i].type][this.items[this.itemsData[i].type].length-1]);
            }
        }
        
        // Interactivity
        this.interactive = true;
        this.mousemove = this.onMouseMove.bind(this);
    }
    
    addItemToBobine(item) {
        
        let coords = this.coords[item.data.type][this.items[item.data.type].length-1];
        if(coords) {
            this.itemsWrapper.addChild(item);
            if(coords.x) item.position.x += this.scene.dimensions.height*coords.x;
            if(coords.y) item.position.y += this.scene.dimensions.height*coords.y;
            if(coords.rotation) item.content.rotation = coords.rotation;
            if(coords.mask) item.addMask(coords.mask);
            item.animateIn();
        }
    }
    
    animateIn() {
        // BACKGROUND ANIMATION
        let animationDuration = 1;
        gsap.set(this.background.scale, { x: 0, y: 0 });
        gsap.to(this.background.scale, animationDuration, { x: this.background.maxScale.x, y: this.background.maxScale.y, delay: 1, ease: Elastic.easeOut.config(1, 0.9)});
        gsap.to(this.background, animationDuration, { rotation: 10, delay: 1, ease: Elastic.easeOut.config(1, 0.9)});
        //gsap.set(this.position, { x: this.scene.dimensions.width/2, y: this.scene.dimensions.height/2 - this.scene.dimensions.height*0.05});
        gsap.set(this.position, { x: 0, y: 0 - this.scene.dimensions.height*0.05});
    }
    
    onMouseMove(e) {
        this.itemsWrapper.position.x = this.itemsWrapper.origin.x - (e.data.global.x - (this.width / 2)) * 0.02;
        this.itemsWrapper.position.y = this.itemsWrapper.origin.y - (e.data.global.y - (this.height / 2)) * 0.02;
    }
}

module.exports = BobineWrapper;