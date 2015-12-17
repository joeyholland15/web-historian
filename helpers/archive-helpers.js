var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('../web/initialize');
var headers = require('../web/http-helpers');
var fetch = require('../workers/htmlfetcher');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, function(err, data) {
    if (err) { throw "Can't read archives/sites.txt"; }
    else {
      callback(data.toString('utf8').split('\n'));
    }  
  });
};

exports.isUrlInList = function(url, callback) {
  callback(url);
};

exports.addUrlToList = function(url, callback) {
  var file = exports.paths.list;
  callback(url, function(url) {
    fs.writeFile(file, url, function(err) {
      console.log("File updated");
      if (err) { throw error; }
    });
  });
};

exports.isUrlArchived = function(url, callback) {
  callback(url);
  // var path = exports.paths.archivedSites + req.url;
  // fs.access(path, fs.F_OK, function(err) {
  //   if (!err) {
  //     console.log("True?", req.url, "true");
  //     exports.downloadUrls(req, res);
  //   } else {
  //     console.log("True?", req.url, "false");
  //     fetch(req, res);
  //   }
  // });
};

exports.downloadUrls = function(array) {
  // for URLs that exist in the archive
  //
  // fs.readFile(exports.paths.archivedSites + req.url, function(err, data) {
  //   res.writeHead(200, headers.headers);
  //   res.write(data);
  //   res.end();
  // });
  for(var i = 0; i < array.length; i++) {
    fs.mkdir(exports.paths.archivedSites + array[i]); 
  }; 
};