/**
 * Created by bryangill on 12/14/16.
 */

var rest = require('restling');
var utilityService = require('./UtilityService');
var parser = require("./ParserService");
var _ = require('lodash');
var S = require('string');

module.exports = {

  destroy: function (model) {
    "use strict";

    try {
      model.destroy()
        .then(function (data) {
          sails.log.info(model.adapter.identity + " destroyed");
        })
        .catch(function (error) {
          sails.log.error(error);
        });
    } catch (error) {
      sails.log.error(error);
    }
  },

  sortDate: function (query, order) {
    var o = order;
    if (!o) {
      o = 'desc';
    }
    "use strict";
    return query.sort("date " + o);
  },

  getTeamRecord: function (team, year, count) {

    var self = this;

    return new Promise(function (resolve, reject) {
      "use strict";

      if (team) {

        var team_selected = {}
        if (!team.short_name) {
          team_selected.short_name = team;
        } else {
          team_selected.short_name = team.short_name;
        }

        Team.getFullname(team_selected.short_name)
          .then(function (team) {
            "use strict";
            var query;
            if (year) {
              query = Game.find({
                game_id: {
                  'startsWith': year
                }
              });
            } else {
              query = Game.find()
            }
            self.sortDate(query, 'desc')
              .then(function (games) {

                var wins = 0;
                var loses = 0;
                "use strict";
                for (var game of games) {
                  if ((wins + loses) < count) {
                    if (game.winning_team && (S(game.winning_team).contains(team[0].full_name))) {
                      wins = wins + 1;
                    } else if (game.losing_team && (S(game.losing_team).contains(team[0].full_name))) {
                      loses = loses + 1;
                    }
                  }
                }

                var s = {
                  team: team_selected.short_name,
                  record: {
                    wins: wins,
                    loses: loses
                  }
                };

                resolve(s);

              })
          })
          .catch(function (error) {
            sails.log.error(error);
            reject(error);
          })

      } else {
        sails.log.error(error);
        reject(error);
      }
    })
  },

  sod: function (team, statistics, count, games) {
    "use strict";

    return new Promise(function (resolve, reject) {

      var calculation = 0;
      var pyth = 0;

      var runsScored = 0;
      var runsAllowed = 0;
      var wins = 0;
      var loses = 0;
      var teamGames = 0;

      var teams = Team.getDivisionTeams(team.short_name);

      async.each(teams, function (team, callback) {

        async.each(games, function (game, callback) {
          if ((wins + loses) < count) {
            if (game.winning_team && (S(game.winning_team).contains(team.full_name))) {
              runsScored = runsScored + game.winning_score;
            } else if (game.losing_team && (S(game.losing_team).contains(team.full_name))) {
              runsAllowed = runsAllowed + game.losing_score;
            }
            pyth = (runsScored * 1.81) / ((runsScored * 1.81) + (runsAllowed * 1.81));

          }
          callback();
        }, function (err) {
          calculation = calculation + (pyth / teams.length);

          statistics.sod = Math.round(calculation * 100) / 100;

          // resolve(calculations);
          // if any of the saves produced an error, err would equal that error
        })

        callback();
      }, function (err) {
        resolve(statistics);
      })

    })
  }

};
