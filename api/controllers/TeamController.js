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

var calculateStatistics = function (callback, games, count, year) {
  "use strict";

  return Team.getTeams().populate('statistics');
}

var records = function (count, year) {
  "use strict";
  return Team.getTeams().populate('records', {
    limit: count,
    sort: 'updatedAt DESC'
  })
}

var statistics = function (count, year) {
  "use strict";
  return Team.getTeams().populate('statistics', {
    limit: count,
    sort: 'updatedAt DESC'
  })
}

module.exports = {

  getStats: function (req, res) {

    var params = init(req);

    statistics(params.count, params.year)
      .then(function (results) {
        "use strict";
        res.send(results);
      })

    // var params = init(req);
    // var query = configureQuery(params.year);
    //
    // async.waterfall([
    //   (callback) => {
    //     "use strict";
    //     teamService.sortDate(query, 'desc')
    //       .then(function (games) {
    //         callback(null, games);
    //       })
    //   },
    //   (games, callback) => {
    //     calculateStatistics(callback, games, params.count, params.year)
    //       .then(function (results) {
    //         "use strict";
    //         callback(null, results);
    //       })
    //   },
    // ], function (err, result) {
    //   return res.send(result);
    // });

  },

  getRecords: function (req, res) {
    "use strict";

    var params = init(req);

    records(params.count, params.year)
      .then(function (results) {
        "use strict";
        res.send(results);
      })

  }

}
