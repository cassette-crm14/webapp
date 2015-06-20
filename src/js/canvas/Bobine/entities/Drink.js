/**
 * Created by jerek0 on 16/06/2015.
 */

let Ponctual = require('./Ponctual');

class Drink extends Ponctual {
    constructor(data, scene) {
        super(data, scene);

    }

    init() {
        super.init();

        let picto = new PIXI.Sprite.fromImage("images/drink.png");
        picto.height = (picto.height / picto.width) * 30;
        picto.width = 30;
        this.pastille.addChild(picto);
    }
}

module.exports = Drink;