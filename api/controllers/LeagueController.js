/**
 * LeagueController
 *
 * @description :: Server-side logic for managing leagues
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var S = require('string');

module.exports = {

  // getLeague: function (req, res) {
  //
  //   var records = [];
  //
  //   var params = {
  //     league: req.param('league')
  //   };
  //
  //   if (req.param('count')) {
  //     params.count = req.param('count');
  //   } else {
  //     params.count = '162';
  //   }
  //
  //   if (params.league) {
  //
  //     League.getLeague(params.league)
  //       .then(function (results) {
  //         return res.send(results);
  //         "use strict";
  //         // for (var team of teams[0].teams) {
  //         //   Team.getFullname(team)
  //         //     .then(function (found) {
  //         //       "use strict";
  //         //       var query;
  //         //       if (params.year) {
  //         //         query = Game.find({
  //         //           game_id: {
  //         //             'startsWith': params.year
  //         //           }
  //         //         });
  //         //       } else {
  //         //         query = Game.find()
  //         //       }
  //         //       query.sort('date desc')
  //         //         .then(function (games) {
  //         //
  //         //           var wins = 0;
  //         //           var loses = 0;
  //         //           "use strict";
  //         //           var count = 0;
  //         //           for (var game of games) {
  //         //             if ((wins + loses) < params.count) {
  //         //               if (game.winning_team && (S(game.winning_team).contains(found[0].full_name))) {
  //         //                 wins = wins + 1;
  //         //               } else if (game.losing_team && (S(game.losing_team).contains(found[0].full_name))) {
  //         //                 loses = loses + 1;
  //         //               }
  //         //             }
  //         //           }
  //         //
  //         //           var s = {
  //         //             team: found[0].full_name,
  //         //             record: {
  //         //               wins: wins,
  //         //               loses: loses
  //         //             }
  //         //           };
  //         //
  //         //           // return res.send(s);
  //         //           records.push({ID: s.team, "record": record});
  //         //         })
  //         //
  //         //     })
  //         //     .catch(function (error) {
  //         //       sails.log.error(error);
  //         //       return res.notFound();
  //         //     })
  //         //
  //         // }
  //       })
  //
  //   }
  //
  // }


}
