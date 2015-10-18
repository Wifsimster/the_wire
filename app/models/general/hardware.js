var Device = require('../../models/device');

function Hardware(_object) {
    var Wire = require('../../utils/wire');
    var PERCENTAGE = 100;

    // Super
    Device.call(this, _object);

    if (Wire.endsWith(this.data, '%')) {
        this.unity = "%";
        this.value = parseInt(this.data.substring(0, this.data.length - 1));
        this.data = [this.value, PERCENTAGE - this.value];
        this.labels = [this.name, this.unity];
    }
}
module.exports = Hardware;