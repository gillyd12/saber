/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var S = require('string');

module.exports = {

  record: function (req, res) {

    var params = {
      team: req.param('abrv'),
      count: req.param('count')
    };

    Team.getFullname(params.team)
      .then(function (team) {
        "use strict";
        var query = Game.find();
        query.sort('date desc')
          .then(function (games) {

            var wins = 0;
            var loses = 0;
            "use strict";
            for (var game of games) {
              if ((wins + loses) < params.count)
                if (game.winning_team && (S(game.winning_team).contains(team[0].full_name))) {
                  wins = wins + 1;
                } else if (game.losing_team && (S(game.losing_team).contains(team[0].full_name))) {
                  loses = loses + 1;
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
        return res.send('error: ' + err);
      })

  }

}

