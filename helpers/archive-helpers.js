var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('../web/initialize');
var headers = require('../web/http-helpers');

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

exports.readListOfUrls = function() {
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function(url) {
  var file = exports.paths.list; 
  fs.writeFile(file, url, function(err) {
    console.log("File updated");
    if (err) { throw error; }
  });
};

exports.isUrlArchived = function(url) {
  var path = exports.paths.archivedSites + url;
  fs.access(path, fs.F_OK, function(err) {
    if (!err) {
      return true;
    } else {
      return false;
    }
  });
};

exports.downloadUrls = function(req, res, url) {
  if (exports.isUrlArchived(url) === false || url === '/') {
    if( url === '/') { 
      url = 'web/public/index.html';
    }
    fs.readFile(url, function(err, data) {
      res.writeHead(200, headers.headers);
      res.write(data);
      res.end();
    });
  } else {
    // return the existing archive
    fs.readFile(exports.paths.archivedSites + url, function(err, data) {
      res.writeHead(200, headers.headers);
      res.write(data);
      res.end();
    });
  }
};