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

        Team.getFullname(team.short_name)
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
                  team: team.short_name,
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
  }


};
