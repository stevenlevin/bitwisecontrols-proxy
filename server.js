var http = require('http');
var express = require('express');
var app = express(); 

var config = require('./config/bitwisecontrols-proxy.js').config;

// setup routes 
require('./routes')(app); 

// start the server 
var server = http.createServer(app).listen(config.port, config.host,  function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('bitwisecontrols-proxy listening at http://%s:%s', host, port);
});
