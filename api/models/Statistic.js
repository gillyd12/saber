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
        var losses = prefix_load.get(team_1.winning_team + 'l');
        var games_played = wins;
        if (losses) {
          if (games_played) {
            games_played = games_played + losses;
          } else {
            games_played = losses;
          }
        }
        self.loadLast20Prefix(prefix_load, team_1.winning_team + 'last20wins', wins, games_played);
        var runs_scored_per_game = Math.round((prefix_load.get(team_1.winning_team + 'rs') / games_played) * 100) / 100;
        var runs_against_per_game = Math.round((prefix_load.get(team_1.winning_team + 'ra') / games_played) * 100) / 100;
        var streak = prefix_load.get(team_1.winning_team + 'winningstreak');
        var pythagorian_w_pct = Math.round((runs_scored_per_game * 1.81) / ((runs_scored_per_game * 1.81) + (runs_against_per_game * 1.81)) * 100) / 100;
        var last_20_wins = prefix_load.get(team_1.winning_team + 'last20wins');
        var last_20_losses = prefix_load.get(team_1.winning_team + 'last20losses');
        self.loadSODPrefix(prefix_load, team_1.winning_team + 'winningSOD');
        var strength_of_division = prefix_load.get(team_1.winning_team + 'winningSOD');

        var obj = {
          file_id: team_1.file_id,
          team: team_1.winning_team,
          wins: wins,
          losses: losses,
          games_played: games_played,
          runs_scored_per_game: runs_scored_per_game,
          runs_against_per_game: runs_against_per_game,
          streak: streak,
          pythagorian_w_pct: pythagorian_w_pct,
          last_20_wins: last_20_wins,
          last_20_losses: last_20_losses,
          strength_of_division: strength_of_division,
          power_rank_rating: 0
        }

        self.loadRatingPrefix(prefix_load, team_1.winning_team + 'winningRating', obj);

        obj.power_rank_rating = prefix_load.get(team_1.winning_team + 'winningRating');

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
        var losses = prefix_load.get(team_2.losing_team + 'l');
        var games_played = wins;
        if (losses) {
          if (games_played) {
            games_played = games_played + losses;
          } else {
            games_played = losses;
          }
        }

        self.loadLast20Prefix(prefix_load, team_2.losing_team + 'last20losses', losses, games_played);
        var runs_scored_per_game = Math.round((prefix_load.get(team_2.losing_team + 'rs') / games_played) * 100) / 100;
        var runs_against_per_game = Math.round((prefix_load.get(team_2.losing_team + 'ra') / games_played) * 100) / 100;
        var streak = prefix_load.get(team_2.losing_team + 'losingstreak');
        var pythagorian_w_pct = Math.round((runs_scored_per_game * 1.81) / ((runs_scored_per_game * 1.81) + (runs_against_per_game * 1.81)) * 100) / 100;
        var last_20_losses = prefix_load.get(team_2.losing_team + 'last20losses');
        var last_20_wins = prefix_load.get(team_2.losing_team + 'last20wins');

        self.loadSODPrefix(prefix_load, team_2.losing_team + 'losingSOD');

        var strength_of_division = prefix_load.get(team_2.losing_team + 'losingSOD');

        var obj = {
          file_id: team_2.file_id,
          team: team_2.losing_team,
          wins: wins,
          losses: losses,
          games_played: games_played,
          runs_scored_per_game: runs_scored_per_game,
          runs_against_per_game: runs_against_per_game,
          streak: streak,
          pythagorian_w_pct: pythagorian_w_pct,
          last_20_wins: last_20_wins,
          last_20_losses: last_20_losses,
          strength_of_division: strength_of_division,
          power_rank_rating: 0
        }

        self.loadRatingPrefix(prefix_load, team_2.losing_team + 'losingRating', obj);

        obj.power_rank_rating = prefix_load.get(team_2.losing_team + 'losingRating');

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

  loadWLPrefix: function (prefix_load, team) {
    "use strict";
    if (prefix_load.has(team)) {
      prefix_load.set(team, prefix_load.get(team) + 1)
    } else {
      prefix_load.set(team, 1)
    }
  },

  loadRSRAPrefix: function (prefix_load, team, runs) {
    "use strict";
    if (prefix_load.has(team)) {
      prefix_load.set(team, prefix_load.get(team) + runs)
    } else {
      prefix_load.set(team, runs)
    }

  },

  loadStreakPrefix: function (prefix_load, team) {
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
  },

  loadLast20Prefix: function (prefix_load, team, count, games_played) {
    "use strict";

    if (games_played <= 20) {
      if (prefix_load.has(team)) {
        var v = prefix_load.get(team);
        if (v) {
          prefix_load.set(team, v + 1);
        } else {
          prefix_load.set(team, 1);
        }
      } else {
        prefix_load.set(team, 1);
      }
    } else {
      if (S(team).contains('last20wins')) {

        prefix_load.set(team, prefix_load.get(team) + 1);

        var old = S(team).chompRight('last20wins').s;
        var losses = prefix_load.get(old + 'last20losses');
        if (losses) {
          prefix_load.set(old + 'last20losses', losses - 1);
        } else {
          prefix_load.set(old + 'last20losses', 0);
        }
      } else if (S(team).contains('last20losses')) {

        prefix_load.set(team, prefix_load.get(team) + 1);

        var old = S(team).chompRight('last20losses').s;

        var wins = prefix_load.get(old + 'last20wins');
        if (wins) {
          prefix_load.set(old + 'last20wins', wins - 1);
        } else {
          prefix_load.set(old + 'last20wins', 0);
        }
      }
    }
  },

  loadSODPrefix: function (prefix_load, team) {
    "use strict";

    var zteam = S(team).left(3).s;
    var teams = Team.getDivisionTeams(zteam);

    var totalPyth = 0;
    async.each(teams, function (team, callback) {

      var rs = 0;
      var ra = 0;

      if (prefix_load.has(team.short_name + 'rs')) {
        rs = prefix_load.get(team.short_name + 'rs');
      } else {
        rs = 0;
      }

      if (prefix_load.has(team.short_name + 'ra')) {
        ra = prefix_load.get(team.short_name  + 'ra');
      } else {
        ra = 0;
      }

      if ((ra + rs) > 0) {
        totalPyth = totalPyth + ((rs * 1.81) / ((rs * 1.81) + (ra * 1.81)));
      }

      callback();
    }, function (err) {
      var calculation = (totalPyth / teams.length);
      prefix_load.set(team, Math.round(calculation * 100) / 100);
    })
  },

  loadRatingPrefix: function(prefix_load, team, obj) {
    "use strict";

    var losses = 0;
    if (obj.losses) {
      losses = obj.losses;
    }
    var l20l = 0;
    if (obj.last_20_losses) {
      l20l = obj.last_20_losses;
    }

    var wins = 0;
    if (obj.wins) {
      wins = obj.wins;
    }
    var l20w = 0;
    if (obj.last_20_wins) {
      l20w = obj.last_20_wins;
    }


    var streak = S(obj.streak).toInt();
    var sodCalc = ((obj.strength_of_division - .5) * 100) / obj.games_played;
    var pythCalc = obj.pythagorian_w_pct - .5

    var rating = Math.round(((wins + l20w + (obj.runs_scored_per_game / 2))
              - (losses + l20l + (obj.runs_against_per_game / 2))
              + (streak)
              + (sodCalc)
              + (pythCalc)) * 100) / 100;

    prefix_load.set(team, rating)

  }


};

