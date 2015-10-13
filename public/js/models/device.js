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
    this.data = _object.Data;
};

Device.prototype.toString = function() {
    console.log(this.name + " : " + this.data);
};