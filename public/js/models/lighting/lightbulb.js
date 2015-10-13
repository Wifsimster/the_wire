function Lightbulb(_object) {
    // Super
    Device.call(this, _object);

    this.data === "On" ? this.data = true : this.data;
    this.data === "Off" ? this.data = false : this.data;
}

Door.prototype.isOpen = function () {
    return this.open;
};