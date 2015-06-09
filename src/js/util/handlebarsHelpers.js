/**
 * Created by jerek0 on 01/06/2015.
 */

let Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

Handlebars.registerHelper('toTime', function(value) {
    let date = new Date(value*1000);
    
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    
    // will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(minutes.length-2);
    
    return formattedTime;
});

Handlebars.registerHelper('toDate', function(value) {
    let date = new Date(value*1000);

    let day = "0"+date.getDate();
    let month = "0"+(date.getMonth()+1);
    let year = date.getFullYear();
    
    return day.substr(day.length-2)+'/'+month.substr(month.length-2)+'/'+year;
});

Handlebars.registerHelper('percentageToData', function(percentage, maxValue, options) {
    let result = percentage * maxValue / 100;
    
    if(options.reverse = true) result = maxValue - result;
    
    return result;
});

Handlebars.registerHelper('indexToData', function(value, nbOfValues, maxSize, options) {
    let result = value * maxSize / nbOfValues;

    return result;
});

Handlebars.registerHelper('changeHexLuminosity', function(hex, lum, options) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
});