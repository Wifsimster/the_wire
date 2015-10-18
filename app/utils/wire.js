var Current = require('../models/general/current.js');
var Hardware = require('../models/general/hardware.js');
var Door = require('../models/lighting/door.js');
var Lightbulb = require('../models/lighting/lightbulb.js');
var Motion = require('../models/lighting/motion.js');
var Push = require('../models/lighting/push.js');
var AirQuality = require('../models/temperature/air_quality.js');
var Lux = require('../models/temperature/lux.js');
var SoundLevel = require('../models/temperature/sound_level.js');
var Temperature = require('../models/temperature/temperature.js');

function Wire() {

}

Wire.parseData = function (data) {
    var generals = [];
    var actuators = [];
    var sensors = [];
    // Each Domoticz devices
    data.result.forEach(function (deviceData) {

        // General devices
        if (deviceData.TypeImg === "current") {
            generals.push(new Current(deviceData));
        }
        if (deviceData.TypeImg === "hardware") {
            generals.push(new Hardware(deviceData));
        }

        // Actuator devices
        if (deviceData.TypeImg === "door") {
            actuators.push(new Door(deviceData));
        }
        if (deviceData.TypeImg === "lightbulb") {
            actuators.push(new Lightbulb(deviceData));
        }
        if (deviceData.TypeImg === "push") {
            actuators.push(new Push(deviceData));
        }
        if (deviceData.TypeImg === "motion") {
            actuators.push(new Motion(deviceData));
        }

        // Sensor devices
        if (deviceData.TypeImg === "air") {
            sensors.push(new AirQuality(deviceData));
        }
        if (deviceData.TypeImg === "lux") {
            sensors.push(new Lux(deviceData));
        }
        if (deviceData.TypeImg === "Speaker") {
            sensors.push(new SoundLevel(deviceData));
        }
        if (deviceData.TypeImg === "temperature") {
            sensors.push(new Temperature(deviceData));
        }
    });
    return {sensors: sensors, actuators: actuators, generals: generals};
};

Wire.endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

module.exports = Wire;