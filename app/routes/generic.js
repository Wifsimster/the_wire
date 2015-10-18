var request = require('request');

var Wire = require('../utils/wire');

var ip = "192.168.0.21";
var port = "8087";

// Actions
var getAllDevices = "/json.htm?type=devices&filter=all&used=true&order=Name";
var getLightsAndSwitches = "/json.htm?type=devices&filter=light&used=true&order=Name";
var getDeviceById = "/json.htm?type=devices&rid=IDX";
var getSunriseAndSunset = "/json.htm?type=command&param=getSunRiseSet";
var turnLightOff = "/json.htm?type=command&param=switchlight&idx=99&switchcmd=Off";
var toggleSwitchState = "/json.htm?type=command&param=switchlight&idx=99&switchcmd=Toggle";
var dimmableLightLevel = "/json.htm?type=command&param=switchlight&idx=99&switchcmd=Set%20Level&level=6";
var getScenesAndGrous = "/json.htm?type=scenes";
var turnSceneOrGroup = "/json.htm?type=command&param=switchscene&idx=&switchcmd=";

// Server control
var shutdownSystem = "/json.htm?type=command&param=system_shutdown";
var rebootSystem = "/json.htm?type=command&param=system_reboot";

//------------------------------------------
//----              PAGES               ----
//------------------------------------------
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('/', function (req, res) {
    res.render('layout', {
        title: 'The Wire'
    });
});

//------------------------------------------
//----              REST               ----
//------------------------------------------
app.get('/devices', function (req, res) {
    request('http://' + ip + ":" + port + "/json.htm?type=devices&filter=all&used=true&order=Name", {},
        function (error, response, body) {
            var result = JSON.parse(body);
            res.json(Wire.parseData(result));
        })
});

/**
 * Toggle a switch light by idx
 */
app.get('/toggle/:idx', function (req, res) {
    request('http://' + ip + ":" + port + "/json.htm?type=command&param=switchlight&idx=" + req.params.idx + "&switchcmd=Toggle", {},
        function (error, response, body) {
            var result = JSON.parse(body);
            res.json(result);
        });
});

/**
 * List all variables
 */
app.get('/toggle/:idx', function (req, res) {
    request('http://' + ip + ":" + port + "/json.htm?type=command&param=getuservariables", {},
        function (error, response, body) {
            var result = JSON.parse(body);
            res.json(result);
        });
});

/**
 * Shutdown Domoticz
 */
app.get('/server/shutwdown', function (req, res) {
    request('http://' + ip + ":" + port + "/json.htm?type=command&param=system_shutdown", {},
        function (error, response, body) {
            var result = JSON.parse(body);
            res.json(result);
        });
});

/**
 * Reboot Domoticz
 */
app.get('/server/reboot', function (req, res) {
    request('http://' + ip + ":" + port + "/json.htm?type=command&param=system_reboot", {},
        function (error, response, body) {
            var result = JSON.parse(body);
            res.json(result);
        });
});