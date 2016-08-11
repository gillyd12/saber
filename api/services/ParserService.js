/**
 * Created by bryangill on 8/9/16.
 */

var fs = require('fs');
var fse = require('fs-extra');
var lbl = require('line-by-line');

module.exports = {

  getDirectoryContentNames: function (path, cb) {

    "use strict";

    var promise = new Promise(function (resolve, reject) {
        try {
          fs.readdir(path, function(err, items) {
            resolve(items);
          });
        } catch (error) {
          sails.log.error(error);
          reject(error);
        }
    });

    return promise;

   // try {
   //
   //    fs.readdir(path, function(err, items) {
   //      cb(items);
   //    });
   //
   //  } catch (error) {
   //    sails.log.error(error);
   //  }
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

  readRows: function(files) {
    "use strict";

    var promise = new Promise(function (resolve, reject) {


      try {
        for (let file of files) {

          var lr = new lbl('input/' + file);

          lr.on('error', function (err) {
            sails.log.error(err);
            reject(err);
            // 'err' contains error object
          });

          lr.on('line', function (line) {
            sails.log.info(line);
            resolve(line);
            // 'line' contains the current line without the trailing newline character.
          });

          lr.on('end', function () {
            sails.log.info('end of readrows');
            // All lines are read, file is closed now.
          });

        }

      } catch (err) {
        sails.log.error('error reading rows from directory: ' + err);
      }

    });

    return promise;

  }

};
