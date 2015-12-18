var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');
var _ = require('underscore');

exports.handleRequest = function (req, res) {
  if (req.method === "GET") {
    if( req.url === '/' ) { 
      fs.readFile('web/public/index.html', function(err, data) {
        res.writeHead(200, headers.headers);
        res.write(data);
        res.end();
      });
    } else {
      //archive.isUrlArchived(req.url); 
      fs.readFile(archive.paths.archivedSites + req.url, function(err, data) {
        res.writeHead(200, headers.headers);
        res.write(data);
        res.end();
      });
    }
    //make sure to refactor if we move read functionality out of download urls method. 
    // archive.isUrlArchived(req, res);
  } else if (req.method === "POST") {
    res.writeHead(302, headers.headers);
    var URL = '';
    req.on('data', function(chunk) {
      URL += chunk;
      URL = URL.split('=')[1];
      archive.readListOfUrls(function(sites) {
        return archive.isUrlInList(URL, function(test) {
          if (_.contains(sites, URL)) {
            test = true;
          } else {
            test = false;
          }
          console.log("Test, line 38: ", test); 
          return test;
        }); 
      });
    });


    //archive.addUrlToList(req.url, function() {

    //});
    // var data = '';
    // req.on('data', function(chunk) {
    //   data += chunk;
    // });
    // req.on('end', function() {
    //   // take our data and put it somewhere
    //   // interact with archive helpers
    // });
    // res.writeHead(201, headers.headers);
    // res.end(archive.paths.list);
  }
};
