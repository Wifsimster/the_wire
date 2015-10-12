var app = angular.module('StarterApp', ['ngRoute']);

// App configuration
app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/home',
                controller: 'HomeCtrl'
            });

        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]);

// App controller
app.controller('AppCtrl', ['$scope', '$http', '$route', '$location', function ($scope, $http, $routeParams, $location) {


    $http.get(url).then(function(data) {
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
}]);