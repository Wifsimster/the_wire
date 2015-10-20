app.controller('HomeCtrl', function ($rootScope, $scope, $http, $timeout, $mdToast) {

    // Domoticz current types
    $rootScope.types = Types();
    $rootScope.advancedSettings = false;

    $scope.getDevices = function () {

        $http.get("/complete/actuators").then(function (data) {
            if (_.isObject(data)) {
                if (data.status === 200) {
                    $scope.actuatorsByNode = data.data;

                    console.log(data.data);
                }
            }
        });

        $http.get("/devices").then(function (data) {

            if (_.isObject(data)) {
                if (data.status === 200) {
                    var sensors = data.data.sensors;
                    var actuators = data.data.actuators;
                    var generals = data.data.generals;

                    var sensorRooms = [];
                    var actuatorRooms = [];
                    var generalRooms = [];

                    // Detect and merge data for duplica name
                    _.each(sensors, function (device) {
                        sensorRooms.push({name: device.room, devices: _.filter(sensors, {room: device.room})});
                    });
                    _.each(actuators, function (device) {
                        actuatorRooms.push({name: device.room, devices: _.filter(actuators, {room: device.room})});
                    });
                    _.each(generals, function (device) {
                        generalRooms.push({name: device.room, devices: _.filter(generals, {room: device.room})});
                    });

                    var mergeSensorDevices = _.map(_.groupBy(sensorRooms, function (device) {
                        return device.name;
                    }), function (grouped) {
                        return grouped[0];
                    });
                    var mergeActuatorDevices = _.map(_.groupBy(actuatorRooms, function (device) {
                        return device.name;
                    }), function (grouped) {
                        return grouped[0];
                    });
                    var mergeGeneralDevices = _.map(_.groupBy(generalRooms, function (device) {
                        return device.name;
                    }), function (grouped) {
                        return grouped[0];
                    });

                    // Expose arrays to $scope
                    $scope.mergeSensorDevices = mergeSensorDevices;
                    $scope.mergeActuatorDevices = mergeActuatorDevices;
                    $scope.mergeGeneralDevices = mergeGeneralDevices;

                    console.log(mergeSensorDevices)

                    //$scope.general = _.sortBy(general, 'room');
                    //$scope.actuators = _.sortBy(actuators, 'room');
                    //$scope.sensors = _.sortBy(sensors, 'room');

                    //// Concat all array in devices
                    //$scope.devices = _(general).concat(actuators, sensors).value();

                    $scope.change = function (idx) {
                        $http.get("/toggle/" + idx).then(function (data) {
                            $scope.parseData();
                            // TODO : Add a toast to notify change
                            $mdToast.show($mdToast.simple().content("Action send !").position("bottom right"));
                        });
                    };
                }
            }
        });
    };

    $scope.getDevices();

    // Function to replicate setInterval using $timeout service.
    $scope.intervalFunction = function () {
        $timeout(function () {
            $scope.parseData();
            $scope.intervalFunction();
        }, 15000)
    };

    // Kick off the interval
    //$scope.intervalFunction();
});