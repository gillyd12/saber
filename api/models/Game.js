/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var parser = require("../services/ParserService");
var S = require('string');

module.exports = {

  attributes: {

    game_id: {
      type: 'string'
    },

    date: {
      type: 'date'
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
        winning_team: ""
      }

      obj.winning_team = self.determineWinner(obj);

      res.model = obj;
      resolve(res);
    });
    return promise;
  },

  determineWinner: function (obj) {
    "use strict";

    if (obj.home_score > obj.visiting_score) {
      return obj.home_team;
    } else {
      return obj.visiting_team;
    }

  },

  // path: function () {
  //   "use strict";
  //   return '/games';
  // },

  load: function () {
    'use strict'

    // startup
    return parser.getScores(parser.getDirectoryContentNames("input"));
  },
};

