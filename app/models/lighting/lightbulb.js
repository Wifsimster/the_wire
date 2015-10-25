var Device = require('../../models/device');

function Lightbulb(_object) {
    // Super
    Device.call(this, _object);

    // For switch component
    this.data === "On" ? this.data = true : this.data;
    this.data === "Off" ? this.data = false : this.data;
    this.data === "Off, Level: 255 %" ? this.data = false : this.data;
    this.data === "On, Level: 255 %" ? this.data = true : this.data;
    this.data === "Off, Level: 100 %" ? this.data = false : this.data;
    this.data === "On, Level: 100 %" ? this.data = true : this.data;
}

Lightbulb.prototype.isOpen = function () {
    return this.open;
};

module.exports = Lightbulb;