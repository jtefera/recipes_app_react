"use strict";

var app = require("./serverApp.js").app;
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, function () {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on" + ":" + server_port);
	console.log("----------------------------");
});