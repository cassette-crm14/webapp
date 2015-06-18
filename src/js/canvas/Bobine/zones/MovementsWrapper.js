/**
 * Created by jerek0 on 17/06/2015.
 */

let PIXI = require('pixi.js');
let MovementBar = require('../entities/MovementBar');

class MovementsWrapper extends PIXI.Container {
    constructor(scene) {
        super();
        
        this.scene = scene;
        
        this.movementData = this.scene.party.movements;
        this.radius = this.scene.dimensions.height*0.3 + this.scene.dimensions.height * 0.02;
        this.movementBars = [];
        
        this.init();
    }
    
    init() {
        let item;
        for(let i = 0; i < this.movementData.length; i++) {
            item = new MovementBar( this.position.x + this.radius * Math.cos(Math.PI*2*i/this.movementData.length), this.position.y + this.radius * Math.sin(Math.PI*2*i/this.movementData.length), Math.PI*2*i/this.movementData.length, this.movementData[i], this.scene.party.secondary_color.substr(1));
            this.addChild(item);
            this.movementBars.push(item);
        }
        
        this.rotation = -Math.PI/2;
    }
    
    animateIn() {
        for(let i = 0; i < this.movementBars.length; i++) {
            this.movementBars[i].animateIn(1.2+(i*0.02));
        }
    }
}

module.exports = MovementsWrapper;