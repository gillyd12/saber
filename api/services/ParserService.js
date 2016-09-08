/**
 * Created by bryangill on 8/9/16.
 */

var fs = require('fs');
var fse = require('fs-extra');
var S = require('string');
var US = require("underscore.string");
var scores = [];
var players = [];
var batters = [];

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

        if (S(file).contains('.txt')) {
          obj.filename = S(file).chompRight('.txt').s;
          var lines = fs.readFileSync('input/Recaps/' + file).toString().split("\n");
          obj.match_up = S(lines[0]).chompRight('\r').s;
          obj.date_of_game = S(lines[1]).chompRight('\r').s;
          for(var line of lines) {
            if (S(line).contains('WIN:')) {
              obj.score = S(line).chompRight('\r').s;
              scores.push(obj);
            }
          }
        }
      }
    } catch (error) {
      sails.log.error(error);
    }

    return scores;
  },

  getBatters: function (files) {
    "use strict";

    try {

      for(var file of files) {

        var filename = null;

        if (S(file).contains('.txt')) {
          filename = S(file).chompRight('.txt').s;
          var lines = fs.readFileSync('input/Box Scores/' + file).toString().split("\n");


          // obj.match_up = S(lines[0]).chompRight('\r').s;
          // obj.date_of_game = S(lines[1]).chompRight('\r').s;


          for (var line of lines) {
            if (S(line).contains('(LF)') ||
              S(line).contains('(CF)') ||
              S(line).contains('(RF)') ||
              S(line).contains('(C)') ||
              S(line).contains('(1B)') ||
              S(line).contains('(2B)') ||
              S(line).contains('(SS)') ||
              S(line).contains('(3B)') ||
              S(line).contains('(DH)')) {
              var obj = {
                filename: filename,
                name: null,
                player_id: null
              }
              obj.name = S(US.strLeft(line, '(')).trim().s;
              obj.player_id = obj.filename + obj.name;
              batters.push(obj);
            }
          }
        }
      }
    } catch (error) {
      sails.log.error(error);
    }


    return batters;
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
      fse.removeSync(from + '/*.txt');
      sails.log.info("completed removing contents from directory");
    } catch (err) {
      sails.log.error('error removing contents from directory: ' + err);
    }
  },

};
