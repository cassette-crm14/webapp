/**
 * Created by jerek0 on 16/06/2015.
 */

module.exports = {
    
    getOppositeColorHex: function(hexTripletColor, returnPrefix) {
        var color = hexTripletColor;
        color = color.substring(1);           // remove #
        color = parseInt(color, 16);          // convert to integer
        color = 0xFFFFFF ^ color;             // invert three bytes
        color = color.toString(16);           // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = returnPrefix + color;                  // prepend #
        return color;
    }
    
}