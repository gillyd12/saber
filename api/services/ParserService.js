/**
 * Created by bryangill on 8/9/16.
 */

var fs = require('fs');
var fse = require('fs-extra');
// var lbl = require('line-by-line');
var S = require('string');
// var Q = require('q');
var scores = [];

module.exports = {

  getDirectoryContentNames: function (path) {

    "use strict";

    try {
      return fs.readdirSync(path);
    } catch (error) {
      sails.log.error(error);
    }

  },

  getScores: function (files) {
    "use strict";

    for(var file of files) {
      var lines = fs.readFileSync('input/' + file).toString().split("\n");
      for(var line of lines) {
        if (S(line).contains('WIN:')) {
          scores.push(S(line).chompRight('\r').s);
        }
      }
    }

    return scores;

      // for (var file of files) {
      //
      //   var lr = new lbl('input/' + file);
      //
      //   lr.on('error', function (err) {
      //     sails.log.error(err);
      //     // 'err' contains error object
      //   });
      //
      //   lr.on('line', function (line) {
      //
      //     if (S(line).contains('WIN:')) {
      //       scores.push(line);
      //       sails.log.info(line);
      //     }
      //
      //   });
      //
      //   lr.on('end', function () {
      //     // sails.log.info('end of readrows');
      //     // All lines are read, file is closed now.
      //   });
      // }
      //
      // return scores;
  },

  moveDirectoryContent: function (from, to) {

    "use strict";

    try {
      sails.log.info("moving directory content")
      fse.copySync(from, to);
      sails.log.info("completed moving directory content")
      this.removeDirectoryContent(from);
    } catch (err) {
      sails.log.error('error moving directory content: ' + err);
    }
  },

  removeDirectoryContent: function (from) {
    "use strict";

    sails.log.info("beginning to remove contents from directory...");
    try {
      sails.log.info("removing contents from directory...");
      fse.emptyDirSync(from);
      sails.log.info("completed removing contents from directory");
    } catch (err) {
      sails.log.error('error removing contents from directory: ' + err);
    }
  },

  // readRows: function (files) {
  //   "use strict";
  //   var self = this;
  //
  //   // var promise = new Promise(function(resolve, reject) {
  //     try {
  //       return self.getScores(files);
  //     } catch (err) {
  //       sails.log.error('error reading rows from directory: ' + err);
  //       // reject(err);
  //     }
  //
  //   // });
  //   //
  //   // return promise;
  //
  // }

};
