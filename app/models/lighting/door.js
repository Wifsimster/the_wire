var Device = require('../../models/device');

function Door(_object) {
    // Super
    Device.call(this, _object);
    this.data === "Closed" ? this.open = false : this.open = true;
}

Door.prototype.isOpen = function () {
    return this.open;
};

module.exports = Door;