var Device = require('../../models/device');

function SoundLevel(_object) {
    var Wire = require('../../utils/wire');

    // Super
    Device.call(this, _object);

    if (Wire.endsWith(this.data, 'dB')) {
        var sound = {};
        sound.value = parseFloat(this.data.substring(0, this.data.length - 2));
        sound.unity = "dB";

        this.data = [];
        this.data.sound = [];
        this.data.sound.push(sound);
    }
}

module.exports = SoundLevel;