/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
var getTeam = function (short_name) {
  "use strict";
  return Team.getFullname(short_name);
  // .then(function (team) {
  //   return team;
  // })

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
var sort = function (query) {
  "use strict";
  return query.sort("date desc");
  // .then(function (games) {
  //   return games;
  // })
}
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

    async.each(games, function(game, callback) {
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
        pyth = (runsScored * 1.81) / ((runsScored * 1.81) + (runsAllowed * 1.81))
        callback();
      }
    }, function(err){

      calculations = {
        team: team[0].full_name,
        runsScored: runsScored,
        runsAllowed: runsAllowed,
        rspg: rspg,
        rapg: rapg,
        pyth: pyth,
        sod: 0
      };

      resolve(calculations);
      // if any of the saves produced an error, err would equal that error
    });

  })
}

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
  },

  getStats: function (req, res) {

    var params = init(req);
    var query = configureQuery(params.year);

    async.waterfall([
      (callback) => {
        "use strict";
        getTeam(params.team)
          .then(function (team) {
            callback(null, query, team)
          })
      },
      (query, team, callback) => {
        "use strict";
        sort(query)
          .then(function (games) {
            callback(null, team, games);
          })
      },
      (team, games, callback) => {
        calculate(callback, games, team, params.count)
          .then(function (result) {
            "use strict";
            callback(null, result);
          })

      },
    ], function (err, result) {
      return res.send(result);
    });

  }

}

function calculateSOD(name, year, count) {
  "use strict";

  /* refactor into own calculation service for all calculations */

  var teams = Team.getDivisionTeams(name);

  var sodCalc = 0;

  /* beginning of refactor */
  return Promise.all(teams)
    .then(function (results) {
      results.forEach(function (team) {
        return Team.getFullname(team)
          .then(function (response) {
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
            return query.sort('date desc')
              .then(function (games) {
                "use strict";

                var runsScored = 0;
                var runsAllowed = 0;
                var wins = 0;
                var loses = 0;

                for (var game of games) {
                  if ((wins + loses) < count) {
                    if (game.winning_team && (S(game.winning_team).contains(team.full_name))) {
                      wins = wins + 1;
                      runsScored = runsScored + game.winning_score;
                    } else if (game.losing_team && (S(game.losing_team).contains(team.full_name))) {
                      loses = loses + 1;
                      runsAllowed = runsAllowed + game.losing_score;
                    }
                  }
                }

                var pyth = (runsScored * 1.81) / ((runsScored * 1.81) + (runsAllowed * 1.81))
                sodCalc = sodCalc + (pyth / teams.length);
              })

          })
          .catch(function (error) {
            sails.log.error(error);
          })
      })
    })

}

/* this method calculates the average pythagorean winning % of the other teams in your division */
