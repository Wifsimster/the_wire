function Lux(_object) {
    // Super
    Device.call(this, _object);

    if (_.endsWith(this.data, 'Lux')) {
        var lux = {};
        lux.value = parseFloat(this.data.substring(0, this.data.length - 3));
        lux.unity = "lx";

        this.data = [];
        this.data.lux = [];
        this.data.lux.push(lux);
    }
}