function Motion(_object) {

    // Super
    Device.call(this, _object);

    this.data === "On" ? this.data = true : this.data;
    this.data === "Off" ? this.data = false : this.data;
}

Door.prototype.isMotion = function () {
    return this.data;
};