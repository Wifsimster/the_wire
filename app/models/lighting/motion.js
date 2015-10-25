var Device = require('../../models/device');

function Motion(_object) {

    // Super
    Device.call(this, _object);

    this.data === "On" ? this.data = true : this.data;
    this.data === "Off" ? this.data = false : this.data;
    this.data === "Off, Level: 255 %" ? this.data = false : this.data;
    this.data === "On, Level: 255 %" ? this.data = true : this.data;
}

Motion.prototype.isMotion = function () {
    return this.data;
};

module.exports = Motion;