/**
 * Created by jerek0 on 17/06/2015.
 */

let PIXI = require('pixi.js');
let gsap = require('gsap');
    
class MovementBar extends PIXI.Graphics {
    constructor( x, y, angle, amp, color) {
        super();
        
        this.position.x = x;
        this.position.y = y;
        this.rotation = angle;
        this.amp = amp;
        this.color = color;
        
        this.init()
    }
    
    init() {
        this.scale.x = 0;
        this.beginFill("0x"+this.color, 0.8);
        this.drawRect(0,0,this.amp*2, 6);
    }
    
    animateIn(delay) {
        gsap.to(this.scale, 1, { x: 1, delay: delay });
    }
    
}

module.exports = MovementBar;