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
var util = require('util');

function Wire(data) {
    var self = this;
    this.actuators = [];
    this.sensors = [];
    this.generals = [];

    // Each Domoticz devices
    data.result.forEach(function (deviceData) {

        // General devices
        if (deviceData.TypeImg === "current") {
            self.generals.push(new Current(deviceData));
        }
        if (deviceData.TypeImg === "hardware") {
            self.generals.push(new Hardware(deviceData));
        }

        // Actuator devices
        if (deviceData.TypeImg === "lightbulb") {
            self.actuators.push(new Lightbulb(deviceData));
        }
        if (deviceData.TypeImg === "push") {
            self.actuators.push(new Push(deviceData));
        }

        // Sensor devices
        if (deviceData.TypeImg === "door") {
            self.sensors.push(new Door(deviceData));
        }
        if (deviceData.TypeImg === "motion") {
            self.sensors.push(new Motion(deviceData));
        }
        if (deviceData.TypeImg === "air") {
            self.sensors.push(new AirQuality(deviceData));
        }
        if (deviceData.TypeImg === "lux") {
            self.sensors.push(new Lux(deviceData));
        }
        if (deviceData.TypeImg === "Speaker") {
            self.sensors.push(new SoundLevel(deviceData));
        }
        if (deviceData.TypeImg === "temperature") {
            self.sensors.push(new Temperature(deviceData));
        }
    });
};

Wire.prototype.getDevices = function () {
    return {sensors: this.sensors, actuators: this.actuators, generals: this.generals};
};

Wire.prototype.getSensors = function () {
    var result = [];
    this.sensors.forEach(function (sensor) {
        if (sensor.idx != "43" && sensor.idx != "32" && sensor.idx != "38") {
            if (util.isArray(sensor.data)) {
                sensor.data.forEach(function (data) {
                    var newSensor = JSON.parse(JSON.stringify(sensor));
                    delete newSensor.data;
                    newSensor.data = data;
                    result.push(newSensor);
                })
            } else {
                result.push(sensor)
            }
        }
    });
    return result;
};

Wire.prototype._getDevices = function () {
    return this.sensors.concat(this.actuators.concat(this.generals));
};

/**
 * Return an array of unique nodeIDs for OpenZWave devices
 */
Wire.prototype._getNodeIDs = function (devices) {
    var nodeIds = [];
    devices.forEach(function (device) {
        if (device.subType === "ZWave") {
            nodeIds.push(device.id.substring(0, 5));
        }
    });
    //console.log(Wire._filter(nodeIds));
    return Wire._filter(nodeIds);
};

Wire.prototype._getNodeDevices = function (nodeIds, nodeId) {
    var devices = this._getDevices();

    // Prepare a node object
    var _node = {nodeId: nodeId, devices: [], batteryLevel: 0};

    devices.forEach(function (device) {
        // Found devices from same node id
        if (device.id.toString().startsWith(nodeId.toString())) {
            nodeIds.forEach(function (_nodeId) {
                if (_nodeId === nodeId) {

                    device.type ? _node.type = device.type : this;
                    device.room ? _node.room = device.room : this;
                    device.lastUpdate ? _node.lastUpdate = device.lastUpdate : this;
                    device.batteryLevel ? _node.batteryLevel = device.batteryLevel : this;

                    if (util.isArray(device.data)) {
                        device.data.forEach(function (data) {
                            _node.devices.push({idx: device.idx, name: device.name, data: data});
                        })
                    } else {
                        _node.devices.push({idx: device.idx, name: device.name, data: device.data});
                    }
                }
            });
        }
    });
    return _node;
};

/**
 * Return an array of switch On/Off devices non ZWave
 * @returns {Array}
 */
Wire.prototype.getOtherActuatorDevices = function () {
    var otherActuatorDevices = [];
    var devices = this._getDevices();
    devices.forEach(function (device) {
        if (device.switchType === "On/Off" && device.subType != "ZWave" && device.room != "Etat" && device.room != "EDF") {
            otherActuatorDevices.push(device);
        }
    });
    return otherActuatorDevices;
}

Wire.prototype.getOpenZWaveDevices = function () {
    var self = this;
    var devices = this._getDevices();
    var nodeIds = this._getNodeIDs(devices);
    var openZWaveDevices = [];
    nodeIds.forEach(function (nodeId) {
        openZWaveDevices.push(self._getNodeDevices(nodeIds, nodeId));
    });
    return openZWaveDevices;
};

Wire.prototype.getOpenZWaveActuatorsDevices = function () {
    var openZWaveDevices = this.getOpenZWaveDevices();
    var openZWaveActuatorDevices = [];
    openZWaveDevices.forEach(function (node) {
        if (node.nodeId === "0000C" || node.nodeId === "0000B" || node.nodeId === "00007") {
            openZWaveActuatorDevices.push(node);
        }
    });
    return openZWaveActuatorDevices;
};

Wire.endsWith = function (str, suffix) {
    return str.toString().indexOf(suffix, str.toString().length - suffix.length) !== -1;
};

/**
 * Return an array of unique value
 * @param array
 * @returns {*}
 * @private
 */
Wire._filter = function (array) {
    return array.filter(function (elem, pos) {
        return array.indexOf(elem) == pos;
    });
};

module.exports = Wire;