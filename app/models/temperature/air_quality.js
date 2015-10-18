var Device = require('../../models/device');

function AirQuality(_object) {
    var Wire = require('../../utils/wire');

    // Super
    Device.call(this, _object);

    if (Wire.endsWith(this.data, 'ppm')) {
        var co2 = {};
        co2.value = parseFloat(this.data.substring(0, this.data.length - 3));
        co2.unity = "ppm";

        this.data = [];
        this.data.push(co2);
    }
}

module.exports = AirQuality;