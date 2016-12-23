/**
 * Created by bryangill on 12/23/16.
 */
/**
 * Record.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// var S = require('string');
// var _ = require('underscore');

module.exports = {

  attributes: {

    file_id: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    team: {
      model: 'team'
    },

    wins: {
      type: 'integer'
    },

    losses: {
      type: 'integer'
    },

    games_behind: {
      type: 'integer'
    },

    winning_pct: {
      type: 'integer'
    }
  },

  map: function (a, res, model) {
    "use strict";
    var self = this;

    var promise = new Promise(function (resolve, reject) {

      var obj = {
        file_id: model.filename,
        team: 'TOR', // check this - needs to match short name of team
        wins: 1,
        losses: 2,
        games_behind: 3,
        winning_pct: 4
      }

      // obj.home_score = self.determineHomeScore(obj, model);
      // obj.visiting_score = self.determineVisitingScore(obj, model);
      // obj.winning_team = self.determineWinner(obj);
      // obj.losing_team = self.determineLoser(obj);
      // obj.winning_score = self.determineWinningScore(obj);
      // obj.losing_score = self.determineLosingScore(obj);

      res.model = obj;
      resolve(res);
    });
    return promise;
  },

  /* todo move this to a service at some point */
  load: function (parser) {
    'use strict'

    // startup
    return parser.getScores(parser.getDirectoryContentNames("input/recaps"));
  },

  populate: function (callback, data) {
    "use strict";
    Record.findOrCreate({ file_id: data.model.file_id }, data.model)
      .then(function (data) {
        "use strict";
        callback();
      })
      .catch(function (error) {
        sails.log.error(error.details);
      });

  }


};

