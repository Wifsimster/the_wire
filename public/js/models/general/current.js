function Current(_object) {
    var MAX_WATT = 250;
    var MAX_KWH = 10;

    // Super
    Device.call(this, _object);

    // If device data end with 'kWh'
    if (_.endsWith(this.data, 'kWh')) {
        this.unity = "kWh";
        this.value = parseInt(this.data.substring(0, this.data.length - 3));
        this.data = [this.value, MAX_KWH - this.value]
        this.labels = [this.name, this.unity];
    }

    // If device data end with 'Watt'
    if (_.endsWith(this.data, 'Watt')) {
        this.unity = "W";
        this.value = parseInt(this.data.substring(0, this.data.length - 4));
        this.data = [this.value, MAX_WATT - this.value]
        this.labels = [this.name, this.unity];
    }
}