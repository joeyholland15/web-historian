var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if (req.method === "GET") {
    if (req.url === '/') {
      fs.readFile('web/public/index.html', function(err, data) {
        res.writeHead(200, headers.headers);
        console.log(data);
        res.write(data);
        res.end();
      });
    }
  } else if (req.method === "POST") {
    var data = '';

    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      // take our data and put it somewhere
      // interact with archive helpers
    });

    res.writeHead(201, headers.headers);
    res.end(archive.paths.list);
  }
};
