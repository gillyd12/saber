/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var teamService = require('../services/TeamService');

var S = require('string');

var init = function (req) {
  "use strict";

  var params = {};

  params = {
    team: req.param('abrv')
  };

  if (req.param('count')) {
    params.count = req.param('count');
  } else {
    params.count = '162';
  }

  if (req.param('year')) {
    params.year = req.param('year').substr(2, 4)
  }

  return params;

};
var configureQuery = function (year) {
  "use strict";
  var query = '';

  if (year) {
    query = Game.find({
      game_id: {
        'startsWith': year
      }
    });
  } else {
    query = Game.find()
  }

  return query;

};

var calculate = function (callback, games, team, count) {
  "use strict";

  return new Promise(function (resolve, reject) {

    var runsScored = 0;
    var runsAllowed = 0;
    var wins = 0;
    var loses = 0;
    var teamGames = 0;
    var rspg = 0;
    var rapg = 0;
    var pyth = 0;
    var calculations = {}

    async.each(games, function (game, callback) {
      if ((wins + loses) < count) {
        if (game.winning_team && (S(game.winning_team).contains(team[0].full_name))) {
          wins = wins + 1;
          teamGames = teamGames + 1;
          runsScored = runsScored + game.winning_score;
        } else if (game.losing_team && (S(game.losing_team).contains(team[0].full_name))) {
          loses = loses + 1;
          teamGames = teamGames + 1;
          runsAllowed = runsAllowed + game.losing_score;
        }
        rspg = runsScored / teamGames;
        rapg = runsAllowed / teamGames;
        pyth = (runsScored * 1.81) / ((runsScored * 1.81) + (runsAllowed * 1.81));

        callback();
      }
    }, function (err) {

      if (err) {
        sails.log.error('error calculating data: ' + err);
        reject(err);
      }

      calculations = {
        team: team[0].full_name,
        runsScored: runsScored,
        runsAllowed: runsAllowed,
        rspg: Math.round(rspg * 100) / 100,
        rapg: Math.round(rapg * 100) / 100,
        pyth: Math.round(pyth * 100) / 100
      };

      resolve(calculations);
      // if any of the saves produced an error, err would equal that error
    });
  })
}

var calculateStatistics = function (callback, games, count, year) {
  "use strict";

  return new Promise(function (resolve, reject) {

    var teams = Team.getTeams();

    /* calculation variables */

    async.each(teams, function (team, callback) {

      var pyth = 0;
      var runsScored = 0;
      var runsAllowed = 0;
      var wins = 0;
      var loses = 0;
      var teamGames = 0;
      var streak = 0;

      /* annotate the teams */

      async.each(games, function (game, callback) {
        if ((wins + loses) < count) {
          if (game.winning_team && (S(game.winning_team).contains(team.full_name))) {
            wins = wins + 1;
            teamGames = teamGames + 1;
            runsScored = runsScored + game.winning_score;
            streak = streak + 1;
          } else if (game.losing_team && (S(game.losing_team).contains(team.full_name))) {
            loses = loses + 1;
            teamGames = teamGames + 1;
            runsAllowed = runsAllowed + game.losing_score;
            streak = streak - 1;

          }
          pyth = (runsScored * 1.81) / ((runsScored * 1.81) + (runsAllowed * 1.81));

        }
        callback();
      }, function (err) {

        var statistics = {
          loses: 0,
          wins: 0,
          games_played: 0,
          last20Wins: 0,
          last20Losses: 0,
          streak: 0,
          rspg: 0,
          rapg: 0,
          sod: 0,
          pyth: 0,
          rating: 0
        }

        statistics.wins = wins;
        statistics.loses = loses;
        statistics.rspg = Math.round((runsScored / teamGames) * 100) / 100;
        statistics.rapg = Math.round((runsAllowed / teamGames) * 100) / 100;
        statistics.pyth = Math.round(pyth * 100) / 100;
        statistics.games_played = teamGames;
        statistics.streak = streak;

        async.waterfall([
          (callback) => {
            "use strict";
            teamService.getTeamRecord(team, year, 20)
              .then(function (result) {
                callback(null, games, team, result);
              })
          },
          (games, team, result, callback) => {
            "use strict";
            teamService.sod(team, result, 162, games)
              .then(function (result) {
                callback(null, result);
              })
          },
        ], function (err, result) {
          statistics.last20Wins = result.record.wins;
          statistics.last20Losses = result.record.loses;
          statistics.sod = result.sod;

          team.statistics = statistics;
          team.statistics.rating = Math.round(((statistics.wins + statistics.last20Wins + (statistics.rspg / 2))
                        -(statistics.loses + statistics.last20Losses + (statistics.rapg /2))
                        +(statistics.streak)
                        +(((statistics.sod - .5) * 100) / statistics.games_played)
                        +(statistics.pyth - .5)) * 100) / 100;

          callback();
        });
      })

    }, function (err) {
      var list = _.sortBy(teams, function(team) {
        return team.statistics.rating;
      })
      list.reverse();
      resolve(list);
    })

  })
}

module.exports = {

  getStats: function (req, res) {

    var params = init(req);
    var query = configureQuery(params.year);

    async.waterfall([
      (callback) => {
        "use strict";
        teamService.sortDate(query, 'desc')
          .then(function (games) {
            callback(null, games);
          })
      },
      (games, callback) => {
        calculateStatistics(callback, games, params.count, params.year)
          .then(function (results) {
            "use strict";
            // callback(null, games, team, calculations);
            callback(null, results);
          })
      },
    ], function (err, result) {
      return res.send(result);
    });

  }

}

/* this method calculates the average pythagorean winning % of the other teams in your division */
