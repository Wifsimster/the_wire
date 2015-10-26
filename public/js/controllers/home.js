app.controller('HomeCtrl', function ($rootScope, $scope, $http, $timeout, $mdToast) {

    // Domoticz current types
    $rootScope.types = Types();
    $rootScope.advancedSettings = false;

    $scope.getDevices = function () {

        $http.get("/complete/actuators").then(function (data) {
            if (_.isObject(data)) {
                if (data.status === 200) {
                    $scope.actuatorsByNode = data.data;

                    _.each($scope.actuatorsByNode, function (node) {
                        if ($scope.nodeType(node) === "powerNode") {
                            node.row = 2;
                        } else {
                            node.row = 1;
                        }
                        node.col = 1;
                    })
                }
            }
        });

        $http.get("/devices").then(function (data) {
            if (_.isObject(data)) {
                if (data.status === 200) {
                    var sensors = data.data.sensors;
                    var generals = data.data.generals;

                    var sensorRooms = [];
                    var generalRooms = [];

                    // Detect and merge data for duplica name
                    _.each(sensors, function (device) {
                        sensorRooms.push({name: device.room, devices: _.filter(sensors, {room: device.room})});
                    });
                    _.each(generals, function (device) {
                        generalRooms.push({name: device.room, devices: _.filter(generals, {room: device.room})});
                    });

                    var mergeSensorDevices = _.map(_.groupBy(sensorRooms, function (device) {
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
                    $scope.mergeGeneralDevices = mergeGeneralDevices;

                    //$scope.general = _.sortBy(general, 'room');
                    //$scope.sensors = _.sortBy(sensors, 'room');

                    //// Concat all array in devices
                    //$scope.devices = _(general).concat(actuators, sensors).value();

                    $scope.change = function (idx) {
                        $http.get("/toggle/" + idx).then(function (data) {
                            console.log("Change '" + idx + "' state !");
                            $scope.getDevices();
                            // TODO : Add a toast to notify change
                            $mdToast.show($mdToast.simple().content("Action send !").position("bottom right"));
                        });
                    };

                    $scope.changeNode = function (devices) {
                        _.each(devices, function (device) {
                            if (device.data === false || device.data === true) {
                                $http.get("/toggle/" + device.idx).then(function (data) {
                                    console.log("Change '" + idx + "' state !");
                                    $scope.getDevices();
                                    // TODO : Add a toast to notify change
                                    $mdToast.show($mdToast.simple().content("Action send !").position("bottom right"));
                                });
                            }
                        })
                    };
                }
            }
        });
    };

    $scope.getDevices();

    // Function to replicate setInterval using $timeout service.
    $scope.intervalFunction = function () {
        $timeout(function () {
            //$scope.getDevices();
            $scope.intervalFunction();
        }, 15000)
    };

    // Kick off the interval
    //$scope.intervalFunction();

    $scope.nodeType = function (node) {
        if (node.nodeId === "00007" || node.nodeId === "0000C") {
            return "powerNode";
        }
        if (node.nodeId === "0000B") {
            return "wallPlug";
        }
        if (node.type === "Switch") {
            return "switch";
        }
    }

    $scope.powerNodeState = function (node) {
        var state = false;
        _.each(node.devices, function (device) {
            if (device.data === true) {
                state = true;
            }
        });
        return state;
    }

    $scope.isCounter = function (unity) {
        if (unity && (unity === "kWh" || unity === "W")) {
            return true;
        }
        return false;
    }
});