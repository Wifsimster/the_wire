var path = require('path');

var ip = "192.168.0.21";
var port = "8087";

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
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                console.log(result);
                if (result.code == 200) {
                    res.json();
                } else {
                    res.json();
                }
            } else {
                res.json();
            }
        })
});