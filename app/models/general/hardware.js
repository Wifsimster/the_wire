var Device = require('../../models/device');

function Hardware(_object) {
    var Wire = require('../../utils/wire');
    var PERCENTAGE = 100;

    // Super
    Device.call(this, _object);

    if (Wire.endsWith(this.data, '%')) {
        this.unity = "%";
        this.data = {value: parseInt(this.data.substring(0, this.data.length - 1)), unity: this.unity};
        this.values = [this.value, PERCENTAGE - this.data];
        this.labels = [this.name, this.unity];
    }
}
module.exports = Hardware;