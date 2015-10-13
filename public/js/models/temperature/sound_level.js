function SoundLevel(_object) {
    // Super
    Device.call(this, _object);

    if (_.endsWith(this.data, 'dB')) {
        var sound = {};
        sound.value = parseFloat(this.data.substring(0, this.data.length - 2));
        sound.unity = "dB";

        this.data = [];
        this.data.sound = [];
        this.data.sound.push(sound);
    }
}