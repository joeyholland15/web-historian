var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');

exports.handleRequest = function (req, res) {
  if (req.method === "GET") {

    res.writeHead(200, headers.headers);
    res.end(archive.paths.list);
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
