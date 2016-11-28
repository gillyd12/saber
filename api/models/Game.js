/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var S = require('string');

module.exports = {

  attributes: {

    game_id: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    date: {
      type: 'datetime'
    },

    home_team: {
      type: 'string'
    },

    home_score: {
      type: 'string'
    },

    visiting_team: {
      type: 'string'
    },

    visiting_score: {
      type: 'string'
    },

    winning_team: {
      type: 'string'
    },

    losing_team: {
      type: 'string'
    },

    // Add a reference to players
    participants: {
      collection: 'Participant',
      via: 'game'
    }


  },

  map: function (a, res, model) {
    "use strict";
    var self = this;

    var promise = new Promise(function (resolve, reject) {

      var obj = {
        game_id: model.filename,
        date: model.date_of_game,
        home_team: model.match_up.substr(model.match_up.indexOf(' at ')+4, model.match_up.length),
        home_score: model.score.substr(model.score.lastIndexOf('-')+1, model.score.length),
        visiting_team: model.match_up.substr(0, model.match_up.indexOf(' at ')),
        visiting_score: model.score.substr(model.match_up.indexOf(': ')-2, model.match_up.indexOf(': ')+2),
        winning_team: "",
        losing_team: ""
      }

      obj.home_score = self.determineHomeScore(obj, model);
      obj.visiting_score = self.determineVisitingScore(obj, model);
      obj.winning_team = self.determineWinner(obj);
      obj.losing_team = self.determineLoser(obj);

      res.model = obj;
      resolve(res);
    });
    return promise;
  },

  determineHomeScore: function (obj, model) {
    "use strict";

    // home score
    // model.match_up.substr(model.match_up.indexOf(' at ')+4, model.match_up.length)

    try {
      var winner = model.score.substr(0, model.score.indexOf('WIN:')-1);

      // sails.log.info(winner);

      if (S(obj.home_team.toLowerCase()).contains(winner.toLowerCase())) {
        return model.score.substring(model.score.indexOf(': ')+2, model.score.lastIndexOf('-'));
      } else {
        return model.score.substring(model.score.lastIndexOf('-')+1, model.score.length);
      }
    } catch (error) {
      sails.log.error(error);
    }

    // visiting score
    // model.score.substr(model.match_up.indexOf(': ')-2, model.match_up.indexOf(': ')+2),
  },

  determineVisitingScore: function (obj, model) {
    "use strict";

    try {
      var winner = model.score.substr(0, model.score.indexOf('WIN:')-1);

      // sails.log.info(winner);

      if (S(obj.visiting_team.toLowerCase()).contains(winner.toLowerCase())) {
        return model.score.substring(model.score.indexOf(': ')+2, model.score.lastIndexOf('-'));
      } else {
        return model.score.substring(model.score.lastIndexOf('-')+1, model.score.length);
      }
    } catch (error) {
      sails.log.error(error);
    }
  },

  determineWinner: function (obj) {
    "use strict";

    if (S(obj.home_score).toInt() > S(obj.visiting_score).toInt()) {
      return obj.home_team;
    } else {
      return obj.visiting_team;
    }

  },

  determineLoser: function (obj) {
    "use strict";

    if (S(obj.home_score).toInt() > S(obj.visiting_score).toInt()) {
      return obj.visiting_team;
    } else {
      return obj.home_team;
    }

  },

  // path: function () {
  //   "use strict";
  //   return '/games';
  // },

  load: function (parser) {
    'use strict'

    // startup
    return parser.getScores(parser.getDirectoryContentNames("input/recaps"));
  },

  populate: function (callback, data) {
    "use strict";
    Game.findOrCreate({ game_id: data.model.game_id }, data.model)
      .then(function (data) {
        "use strict";
        // sails.log.debug("found: " + data.game_id );
        callback();
      })
      .catch(function (error) {
        sails.log.error(error.details);
      });

  }
};

