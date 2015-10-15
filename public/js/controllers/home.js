app.controller('HomeCtrl', function ($rootScope, $scope, $http, $timeout) {

    // Domoticz current types
    $rootScope.types = Types();

    $scope.parseData = function () {
        $http.get("/devices").then(function (data) {
            var general = [];
            var lighting = [];
            var temperature = [];
            if (_.isObject(data)) {
                if (_.isObject(data.data)) {
                    if (_.isArray(data.data.result)) {
                        // Each Domoticz devices
                        _.each(data.data.result, function (deviceData) {

                            if (deviceData.TypeImg === "current") {
                                general.push(new Current(deviceData));
                            }

                            if (deviceData.TypeImg === "hardware") {
                                general.push(new Hardware(deviceData));
                            }

                            // Lighting devices
                            if (deviceData.TypeImg === "door") {
                                lighting.push(new Door(deviceData));
                            }

                            if (deviceData.TypeImg === "lightbulb") {
                                lighting.push(new Lightbulb(deviceData));
                            }

                            if (deviceData.TypeImg === "motion") {
                                lighting.push(new Motion(deviceData));
                            }

                            if (deviceData.TypeImg === "push") {
                                lighting.push(new Push(deviceData));
                            }

                            // Temperature devices
                            if (deviceData.TypeImg === "air") {
                                temperature.push(new AirQuality(deviceData));
                            }

                            if (deviceData.TypeImg === "lux") {
                                temperature.push(new Lux(deviceData));
                            }

                            if (deviceData.TypeImg === "Speaker") {
                                temperature.push(new SoundLevel(deviceData));
                            }

                            if (deviceData.TypeImg === "temperature") {
                                temperature.push(new Temperature(deviceData));
                            }
                        });
                    }
                }
            }

            var temperatureRooms = [];
            var lightingRooms = [];
            var generalRooms = [];

            // Detect and merge data for duplica name
            _.each(temperature, function (device) {
                temperatureRooms.push({name: device.room, devices: _.filter(temperature, {room: device.room})});
            });

            // Detect and merge data for duplica name
            _.each(lighting, function (device) {
                lightingRooms.push({name: device.room, devices: _.filter(lighting, {room: device.room})});
            });

            var mergeTemperatureDevices = _.map(_.groupBy(temperatureRooms, function (device) {
                return device.name;
            }), function (grouped) {
                return grouped[0];
            });

            var mergeLightingDevices = _.map(_.groupBy(lightingRooms, function (device) {
                return device.name;
            }), function (grouped) {
                return grouped[0];
            });

            general = _.sortBy(general, 'room');
            lighting = _.sortBy(lighting, 'room');
            temperature = _.sortBy(temperature, 'room');

            $scope.general = general;
            $scope.lighting = lighting;
            $scope.temperature = temperature;

            $scope.mergeTemperatureDevices = mergeTemperatureDevices;
            $scope.mergeLightingDevices = mergeLightingDevices;

            // Concat all array in devices
            $scope.devices = _(general).concat(lighting, temperature).value();

            $scope.change = function (idx) {
                $http.get("/toggle/" + idx).then(function (data) {
                    // TODO : Add a toast to notify change
                });
            };
        });
    };

    $scope.parseData();

    // Function to replicate setInterval using $timeout service.
    $scope.intervalFunction = function(){
        $timeout(function() {
            $scope.parseData();
            $scope.intervalFunction();
        }, 15000)
    };

    // Kick off the interval
    $scope.intervalFunction();
});