var Device = require('../../models/device');

function Temperature(_object) {
    var Wire = require('../../utils/wire');
    var self = this;

    // Super
    Device.call(this, _object);

    var data = this.data.split(',');

    this.data = [];
    this.data.temperature = [];
    this.data.humidity = [];
    this.data.pressure = [];

    data.forEach(function (result) {
        if (Wire.endsWith(result, 'C')) {
            var temperature = {};
            temperature.value = parseFloat(result.substring(0, result.length - 1));
            temperature.unity = "C";
            self.data.temperature.push(temperature);
        }
        if (Wire.endsWith(result, '%')) {
            var humidity = {};
            humidity.value = parseFloat(result.substring(0, result.length - 1));
            humidity.unity = "%";
            self.data.humidity.push(humidity);
        }
        if (Wire.endsWith(result, 'hPa')) {
            var pressure = {};
            pressure.value = parseFloat(result.substring(0, result.length - 3));
            pressure.unity = "hPa";
            self.data.pressure.push(pressure);
        }
    });
}

module.exports = Temperature;
