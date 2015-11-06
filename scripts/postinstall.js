// PLEASE DO NOT EDIT THIS CODE (it's called in package.json)
// this code tells our server when you deploy.
var http = require('http'),
    qs = require('querystring'),
    os = require('os');
var params = {
  os: os.type(),
  release: os.release(),
  teamcode: "jTKpdmUKpT8oJmOP",
};
http.get({
  host: 'nodeknockout.com',
  port: 80,
  path: '/deploys?' + qs.stringify(params)
});
// END

// You can add you own postinstall hooks here
