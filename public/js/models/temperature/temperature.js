function Temperature(_object) {
    var self = this;

    // Super
    Device.call(this, _object);

    var data = this.data.split(',');

    self.data = [];
    self.data.temperature = [];
    self.data.humidity = [];
    self.data.pressure = [];

    if (_.isArray(data)) {
        _.each(data, function (result) {
            if (_.endsWith(result, 'C')) {
                var temperature = {};
                temperature.value = parseFloat(result.substring(0, result.length - 1));
                temperature.unity = "C";
                self.data.temperature.push(temperature);
            }
            if (_.endsWith(result, '%')) {
                var humidity = {};
                humidity.value = parseFloat(result.substring(0, result.length - 1));
                humidity.unity = "%";
                self.data.humidity.push(humidity);
            }
            if (_.endsWith(result, 'hPa')) {
                var pressure = {};
                pressure.value = parseFloat(result.substring(0, result.length - 3));
                pressure.unity = "hPa";
                self.data.pressure.push(pressure);
            }
        });
    }
}