/**
 * Created by jerek0 on 18/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');
let People = require('../entities/People');

class PeopleWrapper extends PIXI.Container {
    constructor(scene, peopleCollection) {
        super();

        this.peopleCollection = peopleCollection;
        this.peopleItems = [];
        this.scene = scene;
        
        this.width = this.scene.dimensions.width;
        this.height = this.scene.dimensions.height;
        
        this.coords = [
            { x: this.scene.dimensions.width/2+(this.scene.dimensions.height*0.18), y: this.scene.dimensions.height / 2 },
            { x: (this.scene.dimensions.width/2)-(this.scene.dimensions.height*0.2), y: this.scene.dimensions.height / 2-(this.scene.dimensions.height*0.1) },
            { x: (this.scene.dimensions.width/2), y: this.scene.dimensions.height / 2-(this.scene.dimensions.height*0.2) },
            { x: (this.scene.dimensions.width/2)-(this.scene.dimensions.height*0.02), y: this.scene.dimensions.height / 2+(this.scene.dimensions.height*0.1) },
            { x: (this.scene.dimensions.width/2)+(this.scene.dimensions.height*0.14), y: this.scene.dimensions.height / 2+(this.scene.dimensions.height*0.15) },
            { x: (this.scene.dimensions.width/2)+(this.scene.dimensions.height*0.05), y: this.scene.dimensions.height / 2+(this.scene.dimensions.height*0.4) },
            { x: (this.scene.dimensions.width/2)-(this.scene.dimensions.height*0.4), y: this.scene.dimensions.height / 2+(this.scene.dimensions.height*0.1) },
        ];
        
        this.links = [
            { from: 0, to: 1},
            { from: 0, to: 2},
            { from: 0, to: 3},
            { from: 3, to: 4},
            { from: 4, to: 5},
            { from: 1, to: 6}
        ];
        this.linksWrapper = new PIXI.Graphics();
        this.linksWrapper.lineStyle(2, 0x000000, 0.3);
        this.addChild(this.linksWrapper);

        this.init();
    }

    init() {
        let item;
        
        for(let i = 0; i < this.peopleCollection.length; i++) {
            item = new People(this.peopleCollection[i], this.scene);
            if(this.coords[i]) {
                this.addChild(item);
                item.position.x = this.coords[i].x;
                item.position.y = this.coords[i].y;
                item.animateIn(0.5+i*0.1);
            }
            this.peopleItems.push(item);
        }
        
        for(let i = 0; i < this.links.length; i++) {
            let fromItem, toItem;
            if(this.links[i]) {
                fromItem = this.peopleItems[this.links[i].from];
                toItem = this.peopleItems[this.links[i].to];
                
                if(fromItem && toItem) {
                    let deltaY = toItem.position.y - fromItem.position.y;
                    let deltaX = toItem.position.x - fromItem.position.x;
                    let angle = Math.atan2(deltaY, deltaX);

                    this.linksWrapper.moveTo(fromItem.position.x + (fromItem.background.width / 2 + this.scene.dimensions.height * 0.01) * Math.cos(angle), fromItem.position.y + (fromItem.background.height / 2 + this.scene.dimensions.height * 0.01) * Math.sin(angle));
                    this.linksWrapper.lineTo(toItem.position.x + (toItem.background.width / 2 + this.scene.dimensions.height * 0.01) * -Math.cos(angle), toItem.position.y + (toItem.background.height / 2 + this.scene.dimensions.height * 0.01) * -Math.sin(angle));
                }
            }
        }
        gsap.set(this.linksWrapper, {alpha: 0});
        gsap.to(this.linksWrapper, 2, {alpha: 1, delay: 0.5+this.coords.length*0.1});
    }

    animateIn() {

    }
}

module.exports = PeopleWrapper;