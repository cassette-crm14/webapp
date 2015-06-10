/**
 * Created by jerek0 on 10/06/2015.
 */

let PIXI = require('pixi.js');
    
class Zone extends PIXI.DisplayObjectContainer {
    constructor(width, height) {
        super();

        this.baseWidth = width;
        this.baseHeight = height;

        let background = new PIXI.Graphics();
        background.beginFill(0xFF0000);
        background.drawRect(0, 0, this.baseWidth, this.baseHeight);
        this.addChild(background);
    }
    
}

module.exports = Zone;