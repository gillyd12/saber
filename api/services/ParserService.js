/**
 * Created by bryangill on 8/9/16.
 */

var fs = require('fs');
var fse = require('fs-extra');
var S = require('string');
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

    try {

      for(var file of files) {

        var obj = {
          filename: null,
          score: null,
          match_up: null,
          date_of_game: null
        };

        obj.filename = S(file).chompRight('.txt').s;
        var lines = fs.readFileSync('input/' + file).toString().split("\n");
        obj.match_up = S(lines[0]).chompRight('\r').s;
        obj.date_of_game = S(lines[1]).chompRight('\r').s;
        for(var line of lines) {
          if (S(line).contains('WIN:')) {
            obj.score = S(line).chompRight('\r').s;
            scores.push(obj);
          }
        }
      }
    } catch (error) {
      sails.log.error(error);
    }

    return scores;
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

};
