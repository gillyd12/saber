/**
 * Created by bryangill on 8/9/16.
 */

var fs = require('fs');
var fse = require('fs-extra');

module.exports = {


  getDirectoryContentNames: function (path, cb) {

    "use strict";

    try {

      fs.readdir(path, function(err, items) {
        cb(items);
      });

    } catch (error) {
      sails.log.error(error);
    }
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
  }

};
