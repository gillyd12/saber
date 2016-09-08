/**
 * Player.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    player_id: {
      type: 'string'
    },

    name: {
      type: 'string'
    },

    team: {
      model: 'team'
    },

  },

  // init: function () {
  //   "use strict";
  //   Player.findOrCreate({name: 'test name'}, {
  //     name: 'test name',
  //     team: 'BOS'
  //   })
  //     .then(function (data) {
  //       "use strict";
  //       sails.log.info("found: " + data.name);
  //     })
  //     .catch(function (error) {
  //       sails.log.error(error.details);
  //     });
  //
  // },

  map: function (a, res, model) {
    "use strict";
    var self = this;

    var promise = new Promise(function (resolve, reject) {

      var obj = {
        player_id: model.player_id,
        name: model.name
        // date: model.date_of_game,
        // home_team: model.match_up.substr(model.match_up.indexOf(' at ')+4, model.match_up.length),
        // home_score: model.score.substr(model.score.lastIndexOf('-')+1, model.score.length),
        // visiting_team: model.match_up.substr(0, model.match_up.indexOf(' at ')),
        // visiting_score: model.score.substr(model.match_up.indexOf(': ')-2, model.match_up.indexOf(': ')+2),
        // winning_team: "",
        // losing_team: ""
      }

      // obj.winning_team = self.determineWinner(obj);
      // obj.losing_team = self.determineLoser(obj);

      res.model = obj;
      resolve(res);
    });
    return promise;
  },


  load: function (parser) {
    'use strict'

    // startup
    return parser.getBatters(parser.getDirectoryContentNames("input/Box Scores"));
  },

  populate: function (data) {
    "use strict";
    Player.findOrCreate({player_id: data.player_id}, data.model)
      .then(function (data) {
        "use strict";
        sails.log.info("found: " + data.name);
      })
      .catch(function (error) {
        sails.log.error(error.details);
      });

  }


};

