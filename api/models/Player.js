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

    position: {
      type: 'string'
    },

    team: {
      model: 'team'
    },

  },

  map: function (a, res, model) {
    "use strict";
    var self = this;

    var promise = new Promise(function (resolve, reject) {

      var obj = {
        player_id: model.player_id,
        name: model.name,
        team: model.team,
        filename: model.filename,
        position: model.position
      }

      res.model = obj;
      resolve(res);
    });
    return promise;
  },


  load: function (parser) {
    'use strict'

    // startup
    return parser.getBatters(parser.getDirectoryContentNames("input/boxscores"));
  },

  populate: function (callback, data) {
    "use strict";

    sails.log.info("loading: " + data.model.name);

    Player.findOrCreate({player_id: data.model.player_id}, data.model)
      .then(function (data) {
        "use strict";
        // sails.log.info("found: " + data.name);
        callback();
      })
      .catch(function (error) {
        sails.log.error(error.details);
      });

  }


};

