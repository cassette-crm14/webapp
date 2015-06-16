/**
 * Created by jerek0 on 16/06/2015.
 */

let PIXI = require('pixi.js');
let Ponctual = require('./Ponctual');

class Meet extends Ponctual {
    constructor(data, scene) {
        super(data, scene);
    }
    
    init() {
        super.init();
        
        let picto = new PIXI.Sprite.fromImage("/images/meet.png");
        picto.height = (picto.height / picto.width) * 30;
        picto.width = 30;
        this.pastille.addChild(picto);
    } 
}

module.exports = Meet;