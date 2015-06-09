/**
 * Created by jerek0 on 09/06/2015.
 */

module.exports = {
    data: JSON.parse(localStorage.getItem('cassette.data')) || require('../data.json'),
    
    lastUpdate: 0,
    autoSaveDelay: 5000,
    
    init: function() {
        requestAnimationFrame(this.stepLoop.bind(this));
    },
    
    getData: function() {
        return this.data;
    },
    
    getProfile: function() {
        return this.data.profile;
    },
    
    getPartyById: function(id) {
        return this.data.profile.parties[id];
    },
    
    getPartyItemById: function(partyId, itemId) {
        return this.data.profile.parties[partyId].data[itemId];
    },
    
    reset: function() {
        this.data = JSON.parse(JSON.stringify(window.cassetteData));
        this.autoSave();
        console.log("reseted !");
    },
    
    stepLoop: function() {
        if((Date.now() - this.lastUpdate) > this.autoSaveDelay) {
            this.autoSave();
        }
        requestAnimationFrame(this.stepLoop.bind(this));
    },
    
    autoSave: function() {
        console.log('autoSaved');
        this.lastUpdate = Date.now();
        localStorage.setItem('cassette.data', JSON.stringify(this.data));
    }
}