app.controller('HomeCtrl', function ($rootScope, $scope, $http) {

    // Domoticz current types
    $rootScope.types = Types();

    console.log($scope.types);

    $http.get("/devices").then(function(data) {
        var devices = [];
        if(_.isObject(data)) {
            if(_.isObject(data.data)) {
                if (_.isArray(data.data.result)) {
                    _.each(data.data.result, function (deviceData) {
                        devices.push(new Device(deviceData));
                    });
                }
            }
        }

        $scope.devices = devices;

        console.log(devices);
    });
});