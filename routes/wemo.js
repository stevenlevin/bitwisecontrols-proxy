var express = require('express');
var router = express.Router();
var Wemo = require('wemo-client');
var wemo = new Wemo();
var util = require('util');

var clients = [];

router.get('/:action/:ip', function(req, res) {

    if (req.params.ip && req.params.action && (req.params.action == 'toggle')) {
	if (clients[req.params.ip]) {
	    //console.log('re-use');
	    toggleBinaryState(clients[req.params.ip]);
	} else {
	    //console.log('load');
	    wemo.load(util.format('http://%s:49153/setup.xml', req.params.ip), function (deviceInfo) {
		clients[req.params.ip] = wemo.client(deviceInfo);

		toggleBinaryState(clients[req.params.ip]);
	    });
	}

	buffer = '';

	res.send('toggle');
    } else {
	//console.log('no action taken');
	res.send('no toggle');
    }
});

function toggleBinaryState(client) {
    var binaryState;
    client.getBinaryState(function(err, state) {
	//console.log('cstate: ' + state);
	binaryState = (state == "0") ? 1 : 0;
	//console.log('nstate: ' + binaryState);
	client.setBinaryState(binaryState);
    });
}

module.exports = router;
