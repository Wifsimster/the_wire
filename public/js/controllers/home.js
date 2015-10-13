app.controller('HomeCtrl', function ($rootScope, $scope, $http) {

    // Domoticz current types
    $rootScope.types = Types();

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

        var rooms = [];
        // Detect and merge data for duplica name
        _.each(temperature, function (device) {
            rooms.push({name: device.name, devices: _.filter(temperature, {name: device.name})});
        });

        var mergeTemperatureDevices = _.map(_.groupBy(rooms,function(device){
            return device.name;
        }),function(grouped){
            return grouped[0];
        });

        $scope.general = general;
        $scope.lighting = lighting;
        $scope.temperature = temperature;
        $scope.mergeTemperatureDevices = mergeTemperatureDevices;

        // Concat all array in devices
        $scope.devices = _(general).concat(lighting, temperature).value();

        console.log($scope.lighting);
    });
});