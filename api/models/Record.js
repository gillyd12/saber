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
      type: 'string'
      // unique: true,
      // primaryKey: true
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
      type: 'float'
    },

    winning_pct: {
      type: 'float'
    }
  },

  /* todo move this to a service at some point */
  load: function (parser) {
    'use strict'

    // startup
    return parser.getScores(parser.getDirectoryContentNames("input/recaps"));
  },

  map: function (a, res, model) {
    "use strict";
    var self = this;

    var team_1 = {};
    var team_2 = {};

    return new Promise(function (resolve, reject) {

      Game.find({game_id: model.filename})
        .then(function (game) {

          async.series([
            function (callback) {
              // var team = '';
              TeamService.getShortName(game[0].winning_team)
                .then(function (response) {
                  team_1 = {
                    file_id: model.filename,
                    winning_team: response[0].short_name
                  }
                  callback();
                })
            },
            function (callback) {
              TeamService.getShortName(game[0].losing_team)
                .then(function (response) {
                  team_2 = {
                    file_id: model.filename,
                    losing_team: response[0].short_name
                  }
                  callback();
                })
            },
            function (callback) {
              var obj = [team_1, team_2]
              res.model = obj;
              resolve(res);
              return callback();
            }
          ])
        })
    })
  },

  populate: function (callback, data, prefix_load) {
    "use strict";

    var self = this;

    var team_1 = data.model[0];
    var team_2 = data.model[1];

    // todo prefix_load - preload this up with existing numbers

    async.series([
      function (callback) {

        self.loadPrefix(prefix_load, team_1.winning_team + 'w');
        var wins = prefix_load.get(team_1.winning_team + 'w');
        var loses = prefix_load.get(team_1.winning_team + 'l');
        var pct = RecordService.calculateWinningPct(wins, loses);

        var obj = {
          file_id: team_1.file_id,
          team: team_1.winning_team,
          wins: wins,
          losses: loses,
          winning_pct: pct
        }

        Record.create(obj)
          .then(function (data) {
            "use strict";
            callback();
          })
          .catch(function (error) {
            sails.log.info(error.details);
          });
      },
      function (callback) {

        self.loadPrefix(prefix_load, team_2.losing_team + 'l');
        var wins = prefix_load.get(team_2.losing_team + 'w');
        var loses = prefix_load.get(team_2.losing_team + 'l');
        var pct = RecordService.calculateWinningPct(wins, loses);

        var obj = {
          file_id: team_2.file_id,
          team: team_2.losing_team,
          wins: wins,
          losses: loses,
          winning_pct: pct
        }

        Record.create(obj)
          .then(function (data) {
            "use strict";
            callback();
          })
          .catch(function (error) {
            sails.log.info(error.details);
          });
      },
      function (callback) {
        return callback();
      }
    ])
  },

  loadPrefix: function(prefix_load, team) {
    "use strict";
    if (prefix_load.has(team)) {
      prefix_load.set(team, prefix_load.get(team) + 1)
    } else {
      prefix_load.set(team, 1)
    }
  }


};

