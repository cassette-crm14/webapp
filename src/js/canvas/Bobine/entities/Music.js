/**
 * Created by jerek0 on 16/06/2015.
 */

let Ponctual = require('./Ponctual');

class Drink extends Ponctual {
    constructor(data, scene) {
        super(data, scene);

        this.removeChild(this.pastille);

        this.content.interactive = true;
        this.content.mouseover = this.onMouseOver.bind(this);
        this.content.mouseout = this.onMouseOut.bind(this);
    }
    
    addMask() {
        // Silence is golden
    }
}

module.exports = Drink;