function Device(_object) {
    this.description = _object.Description;
    this.favorite = _object.Favorite;
    this.lastUpdate = _object.LastUpdate;
    this.name = _object.Name;
    this.protected = _object.Protected;
    this.status = _object.Status;
    this.type = _object.Type;
    this.typeImg = _object.TypeImg;
    this.usedByCamera = _object.UsedByCamera;
    this.xOffset = _object.XOffset;
    this.yOffset = _object.YOffset;
    this.idx = _object.idx;
    this.hardwareId = _object.HardwareID;
    this.hardwareName = _object.HardwareName;
    this.hardwareType = _object.HardwareType;
    this.hardwareTypeVal = _object.HardwareTypeVal;
    this.batteryLevel = _object.BatteryLevel;
    this.id = _object.ID;
    this.data = _object.Data;
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
    this.level = _object.Level;
    this.levelInt = _object.LevelInt;
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

    if (this.name.split(' - ').length > 1) {
        this.room = this.name.split(' - ')[0].trim();
        this.name = this.name.substring(this.room.length + 2).trim();
    }
};

Device.prototype.toString = function () {
    console.log(this.name + " : " + this.data);
};

module.exports = Device;