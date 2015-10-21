var Device = require('../../models/device');

function Lightbulb(_object) {
    // Super
    Device.call(this, _object);

    // For switch component
    this.data === "On" ? this.data = true : this.data;
    this.data === "Off" ? this.data = false : this.data;
    this.data === "Off, Level: 255 %" ? this.data = false : this.data;

    this.addjMulti = _object.AddjMulti;
    this.addjMulti2 = _object.AddjMulti2;
    this.addjValue = _object.AddjValue;
    this.addjValue2 = _object.AddjValue2;
    this.batteryLevel = _object.BatteryLevel;
    this.customImage = _object.CustomImage;
    this.haveDimmer = _object.HaveDimmer;
    this.haveGroupCmd = _object.HaveGroupCmd;
    this.haveTimeout = _object.HaveTimeout;
    this.image = _object.Image;
    this.isSubDevice = _object.IsSubDevice;
    this.maxDimLevel = _object.MaxDimLevel;
    this.planId = _object.PlanID;
    this.planIds = _object.PlanIDs;
    this.showNotifications = _object.ShowNotifications;
    this.signalLevel = _object.SignalLevel;
    this.strParam1 = _object.StrParam1;
    this.strParam2 = _object.StrParam2;
    this.subType = _object.SubType;
    this.switchType = _object.SwitchType;
    this.switchTypeVal = _object.SwitchTypeVal;
    this.timers = _object.Timers;
    this.unit = _object.Unit;
    this.used = _object.Used;
}

Lightbulb.prototype.isOpen = function () {
    return this.open;
};

module.exports = Lightbulb;