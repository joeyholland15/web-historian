var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var path = require('path');

//archive.downloadUrls();

//if url doesn't exist... (moved from download urls). 

module.exports = function(req, res) {
  if( req.url === '/') { 
    req.url = 'web/public/index.html';
  }
  fs.readFile(req.url, function(err, data) {
    res.writeHead(404, headers.headers);
    res.write(data);
    console.log("Testing from False:", req.url, data);
    res.end();
  });
}; 