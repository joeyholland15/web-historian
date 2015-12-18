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
    var url = '';
    req.on('data', function(chunk) {
      url += chunk;
      url = url.split('=')[1];
      archive.isUrlArchived(url, function() {
        var path = archive.paths.archivedSites + req.url;
        fs.access(path, fs.F_OK, function(err) {
          if (err) { // this is a valid path
            isArchrived = true;
            console.log("Archived?", isArchrived);
            // return the archived html txt
          } else {
            isArchrived = false; // this is not valid path
            console.log("Archived?", isArchrived);
            archive.readListOfUrls(function(sites) {
              archive.isUrlInList(url, function(test) {
                if (_.contains(sites, url)) {
                  test = true; // cool, wait. here is your 302
                  res.writeHead(302, headers.headers); // note: this need to go in the path of valid URL, but not archived
                } else {
                  test = false; // Add to the List
                  archive.addUrlToList(url, function() {
                    var file = archive.paths.list; // this is the sites lists
                    fs.writeFile(file, url + '\n', function(err) {
                      console.log("File updated");
                      if (err) { throw error; }
                      res.writeHead(302, headers.headers);
                      res.end();
                    });
                  });
                }
              }); 
            }); 
          }
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
