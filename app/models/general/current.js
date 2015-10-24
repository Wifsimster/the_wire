var Device = require('../../models/device');

function Current(_object) {
    var Wire = require('../../utils/wire');
    var MAX_WATT = 250;
    var MAX_KWH = 10;

    // Super
    Device.call(this, _object);

    // If device data end with 'kWh'
    if (Wire.endsWith(this.data, 'kWh')) {
        this.unity = "kWh";
        this.data = {value: parseInt(this.data.substring(0, this.data.length - 3)), unity: this.unity};
        this.values = [this.value, MAX_KWH - this.data]
        this.labels = [this.name, this.unity];
    }

    // If device data end with 'Watt'
    if (Wire.endsWith(this.data, 'Watt')) {
        this.unity = "W";
        this.data = {value: parseInt(this.data.substring(0, this.data.length - 4)), unity: this.unity};
        this.values = [this.value, MAX_WATT - this.data]
        this.labels = [this.name, this.unity];
    }
}

module.exports = Current;