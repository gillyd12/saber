/**
 * LeagueController
 *
 * @description :: Server-side logic for managing leagues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var S = require('string');

module.exports = {

  getLeagueRecord: function (req, res) {

    var records = [];

    var params = {
      league: req.param('league')
    };

    if (params.league) {

      League.getTeams(params.league)
        .then(function (teams) {
          "use strict";
          // for (var team of teams) {
          //   Team.getFullname(params.team)
          //     .then(function (team) {
          //       "use strict";
          //       var query;
          //       if (params.year) {
          //         query = Game.find({
          //           game_id: {
          //             'startsWith': params.year
          //           }
          //         });
          //       } else {
          //         query = Game.find()
          //       }
          //       query.sort('date desc')
          //         .then(function (games) {
          //
          //           var wins = 0;
          //           var loses = 0;
          //           "use strict";
          //           var count = 0;
          //           for (var game of games) {
          //             if ((wins + loses) < params.count) {
          //               if (game.winning_team && (S(game.winning_team).contains(team[0].full_name))) {
          //                 wins = wins + 1;
          //               } else if (game.losing_team && (S(game.losing_team).contains(team[0].full_name))) {
          //                 loses = loses + 1;
          //               }
          //             }
          //           }
          //
          //           var s = {
          //             team: params.team,
          //             record: {
          //               wins: wins,
          //               loses: loses
          //             }
          //           };
          //
          //           // return res.send(s);
          //           records.push({ID: s.team, "record": record});
          //
          //         })
          //     })
          //     .catch(function (error) {
          //       sails.log.error(error);
          //       return res.notFound();
          //     })
          //
          // }

          return res.send(teams);

        })
    }

  }


}
