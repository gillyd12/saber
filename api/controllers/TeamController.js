/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var S = require('string');

module.exports = {

  getTeamRecord: function (req, res) {

    var params = {
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

    if (params.team) {

      Team.getFullname(params.team)
        .then(function (team) {
          "use strict";
          var query;
          if (params.year) {
            query = Game.find({
              game_id: {
                'startsWith': params.year
              }
            });
          } else {
            query = Game.find()
          }
          query.sort('date desc')
            .then(function (games) {

              var wins = 0;
              var loses = 0;
              "use strict";
              var count = 0;
              for (var game of games) {
                if ((wins + loses) < params.count) {
                  if (game.winning_team && (S(game.winning_team).contains(team[0].full_name))) {
                    wins = wins + 1;
                  } else if (game.losing_team && (S(game.losing_team).contains(team[0].full_name))) {
                    loses = loses + 1;
                  }
                }
              }

              var s = {
                team: params.team,
                record: {
                  wins: wins,
                  loses: loses
                }
              };

              return res.send(s);

            })
        })
        .catch(function (error) {
          sails.log.error(error);
          return res.notFound();
        })

    } else {
      return res.notFound();
    }
  },


  getStreak: function (req, res) {

    var params = {
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

    if (params.team) {

      Team.getFullname(params.team)
        .then(function (team) {
          "use strict";
          var query;
          if (params.year) {
            query = Game.find({
              game_id: {
                'startsWith': params.year
              }
            });
          } else {
            query = Game.find()
          }
          query.sort('date desc')
            .then(function (games) {

              var streak = 0;
              var wins = 0;
              var loses = 0;
              "use strict";
              var count = 0;
              for (var game of games) {
                if ((wins + loses) < params.count) {
                  if (game.winning_team && (S(game.winning_team).contains(team[0].full_name))) {
                    wins = wins + 1;
                    streak = streak + 1;
                  } else if (game.losing_team && (S(game.losing_team).contains(team[0].full_name))) {
                    loses = loses + 1;
                    streak = streak - 1;
                  }
                }
              }

              var s = {
                team: params.team,
                streak: streak
              };

              return res.send(s);

            })
        })
        .catch(function (error) {
          sails.log.error(error);
          return res.notFound();
        })

    } else {
      return res.notFound();
    }
  }


}

