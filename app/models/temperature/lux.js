var Device = require('../../models/device');

function Lux(_object) {
    var Wire = require('../../utils/wire');
    // Super
    Device.call(this, _object);

    if (Wire.endsWith(this.data, 'Lux')) {
        var lux = {};
        lux.value = parseFloat(this.data.substring(0, this.data.length - 3));
        lux.unity = "lx";

        this.data = [];
        this.data.lux = [];
        this.data.lux.push(lux);
    }
}

module.exports = Lux;