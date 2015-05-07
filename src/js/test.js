/**
 * Created by jerek0 on 07/05/2015.
 */

class Test {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    
    sayHello() {
        console.log("My name is "+this.name+" and I am number #"+this.id);
    }
}

module.exports = Test;