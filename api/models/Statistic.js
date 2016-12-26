/**
 * Created by bryangill on 12/23/16.
 */
/**
 * Statistics.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var S = require('string');
// var _ = require('underscore');

module.exports = {

  attributes: {

    file_id: {
      type: 'string'
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

    games_played: {
      type: 'integer'
    },

    last_20_wins: {
      type: 'integer'
    },

    last_20_losses: {
      type: 'integer'
    },

    streak: {
      type: 'string'
    },

    runs_scored_per_game: {
      type: 'float'
    },

    runs_against_per_game: {
      type: 'float'
    },

    strength_of_division: {
      type: 'float'
    },

    pythagorian_w_pct: {
      type: 'float'
    },

    power_rank_rating: {
      type: 'float'
    },

    power_rank_number: {
      type: 'integer'
    }

  },


  /* logic to complete */
  // async.each(teams, function (team, callback) {
  //
  //   var pyth = 0;
  //   var runsScored = 0;
  //   var runsAllowed = 0;
  //   var wins = 0;
  //   var loses = 0;
  //   var teamGames = 0;
  //   var streak = 0;
  //
  //   /* annotate the teams */
  //
  //   async.each(games, function (game, callback) {
  //     if ((wins + loses) < count) {
  //       if (game.winning_team && (S(game.winning_team).contains(team.full_name))) {
  //         wins = wins + 1;
  //         teamGames = teamGames + 1;
  //         runsScored = runsScored + game.winning_score;
  //         streak = streak + 1;
  //       } else if (game.losing_team && (S(game.losing_team).contains(team.full_name))) {
  //         loses = loses + 1;
  //         teamGames = teamGames + 1;
  //         runsAllowed = runsAllowed + game.losing_score;
  //         streak = streak - 1;
  //
  //       }
  //       pyth = (runsScored * 1.81) / ((runsScored * 1.81) + (runsAllowed * 1.81));
  //
  //     }
  //     callback();
  //   }, function (err) {
  //
  //     var statistics = {
  //       loses: 0,
  //       wins: 0,
  //       games_played: 0,
  //       last20Wins: 0,
  //       last20Losses: 0,
  //       streak: 0,
  //       rspg: 0,
  //       rapg: 0,
  //       sod: 0,
  //       pyth: 0,
  //       rating: 0
  //     }
  //
  //     statistics.wins = wins;
  //     statistics.loses = loses;
  //     statistics.rspg = Math.round((runsScored / teamGames) * 100) / 100;
  //     statistics.rapg = Math.round((runsAllowed / teamGames) * 100) / 100;
  //     statistics.pyth = Math.round(pyth * 100) / 100;
  //     statistics.games_played = teamGames;
  //     statistics.streak = streak;
  //
  //     async.waterfall([
  //       (callback) => {
  //         "use strict";
  //         teamService.getTeamRecord(team, year, 20)
  //           .then(function (result) {
  //             callback(null, games, team, result);
  //           })
  //       },
  //       (games, team, result, callback) => {
  //         "use strict";
  //         teamService.sod(team, result, 162, games)
  //           .then(function (result) {
  //             callback(null, result);
  //           })
  //       },
  //     ], function (err, result) {
  //       statistics.last20Wins = result.record.wins;
  //       statistics.last20Losses = result.record.loses;
  //       statistics.sod = result.sod;
  //
  //       team.statistics = statistics;
  //       team.statistics.rating = Math.round(((statistics.wins + statistics.last20Wins + (statistics.rspg / 2))
  //           - (statistics.loses + statistics.last20Losses + (statistics.rapg / 2))
  //           + (statistics.streak)
  //           + (((statistics.sod - .5) * 100) / statistics.games_played)
  //           + (statistics.pyth - .5)) * 100) / 100;
  //
  //       callback();
  //     });
  //   })
  //
  // }, function (err) {
  //   var list = _.sortBy(teams, function (team) {
  //     return team.statistics.rating;
  //   })
  //   list.reverse();
  //   resolve(list);
  // })
  //     })
  // })


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
                    winning_team: response[0].short_name,
                    winning_score: game[0].winning_score
                  }
                  callback();
                })
            },
            function (callback) {
              TeamService.getShortName(game[0].losing_team)
                .then(function (response) {
                  team_2 = {
                    file_id: model.filename,
                    losing_team: response[0].short_name,
                    losing_score: game[0].losing_score
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

    async.parallel([
      function (callback) {

        self.loadWLPrefix(prefix_load, team_1.winning_team + 'w');
        self.loadRSRAPrefix(prefix_load, team_1.winning_team + 'rs', team_1.winning_score);
        self.loadRSRAPrefix(prefix_load, team_1.winning_team + 'ra', team_2.losing_score);
        self.loadStreakPrefix(prefix_load, team_1.winning_team + 'winningstreak');
        var wins = prefix_load.get(team_1.winning_team + 'w');
        var loses = prefix_load.get(team_1.winning_team + 'l');
        var games_played = wins;
        if (loses) {
          if (games_played) {
            games_played = games_played + loses;
          } else {
            games_played = loses;
          }
        }
        var runs_scored_per_game = prefix_load.get(team_1.winning_team + 'rs') / games_played;
        var runs_against_per_game = prefix_load.get(team_1.winning_team + 'ra') / games_played;
        var streak = prefix_load.get(team_1.winning_team + 'winningstreak');

        var obj = {
          file_id: team_1.file_id,
          team: team_1.winning_team,
          wins: wins,
          losses: loses,
          games_played: games_played,
          runs_scored_per_game: runs_scored_per_game,
          runs_against_per_game: runs_against_per_game,
          streak: streak
        }

        Statistic.create(obj)
          .then(function (data) {
            "use strict";
            callback();
          })
          .catch(function (error) {
            sails.log.info(error.details);
          });
      },
      function (callback) {

        self.loadWLPrefix(prefix_load, team_2.losing_team + 'l');
        self.loadRSRAPrefix(prefix_load, team_2.losing_team + 'rs', team_2.losing_score);
        self.loadRSRAPrefix(prefix_load, team_2.losing_team + 'ra', team_1.winning_score);
        self.loadStreakPrefix(prefix_load, team_2.losing_team + 'losingstreak');
        var wins = prefix_load.get(team_2.losing_team + 'w');
        var loses = prefix_load.get(team_2.losing_team + 'l');
        var games_played = wins;
        if (loses) {
          if (games_played) {
            games_played = games_played + loses;
          } else {
            games_played = loses;
          }
        }

        var runs_scored_per_game = prefix_load.get(team_2.losing_team + 'rs') / games_played;
        var runs_against_per_game = prefix_load.get(team_2.losing_team + 'ra') / games_played;
        var streak = prefix_load.get(team_2.losing_team + 'losingstreak');

        var obj = {
          file_id: team_2.file_id,
          team: team_2.losing_team,
          wins: wins,
          losses: loses,
          games_played: games_played,
          runs_scored_per_game: runs_scored_per_game,
          runs_against_per_game: runs_against_per_game,
          streak: streak
        }

        Statistic.create(obj)
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

  loadWLPrefix: function(prefix_load, team) {
    "use strict";
    if (prefix_load.has(team)) {
      prefix_load.set(team, prefix_load.get(team) + 1)
    } else {
      prefix_load.set(team, 1)
    }
  },

  loadRSRAPrefix: function(prefix_load, team, runs) {
    "use strict";
    if (prefix_load.has(team)) {
      prefix_load.set(team, prefix_load.get(team) + runs)
    } else {
      prefix_load.set(team, runs)
    }

  },

  loadStreakPrefix: function(prefix_load, team) {
    "use strict";
    if (S(team).contains('winningstreak')) {
      if (prefix_load.has(team)) {
        var pos = S(prefix_load.get(team)).toInt() + 1
        prefix_load.set(team, S(pos).toString());
        var old = S(team).chompRight('winningstreak').s;
        prefix_load.set(old + 'losingstreak', '0');
      } else {
        prefix_load.set(team, '1')
      }
    } else if (S(team).contains('losingstreak')) {
      if (prefix_load.has(team)) {
        var neg = S(prefix_load.get(team)).chompLeft('-').s;
        var pos = S(neg).toInt() + 1;
        var backToNeg = '-' + S(pos).toString();
        prefix_load.set(team, backToNeg);
        var old = S(team).chompRight('losingstreak').s;
        prefix_load.set(old + 'winningstreak', '0');
      } else {
        prefix_load.set(team, '-1');
      }
    }

  }

};

