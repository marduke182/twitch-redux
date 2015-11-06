var express = require('express');
var app = express();

//Create a static file server
app.configure(function() {
  app.use(express.static(__dirname + '/public'));
});

//Get the dummy data
require('./server/ddata.js');

var port = 8080;
app.listen(port);
console.log('Express server started on port %s', port);
