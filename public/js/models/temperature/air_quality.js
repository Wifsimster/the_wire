function AirQuality(_object) {

    // Super
    Device.call(this, _object);

    if (_.endsWith(this.data, 'ppm')) {
        var co2 = {};
        co2.value = parseFloat(this.data.substring(0, this.data.length - 3));
        co2.unity = "ppm";

        this.data = [];
        this.data.co2 = [];
        this.data.co2.push(co2);
    }
}