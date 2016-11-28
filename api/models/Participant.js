/**
 * Participant.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    player_id: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    name: {
      type: 'string'
    },

    position: {
      type: 'string'
    },

    game: {
      model: 'game'
    }

  },

  map: function (a, res, model) {
    "use strict";
    var self = this;

    var promise = new Promise(function (resolve, reject) {

      var obj = {
        player_id: model.player_id,
        name: model.name,
        position: model.position,
        game: model.filename
      }

      res.model = obj;
      resolve(res);
    });
    return promise;
  },


  load: function (parser) {
    'use strict'

    // startup
    return parser.getParticipants(parser.getDirectoryContentNames("input/boxscores"));
  },

  populate: function (callback, data) {
    "use strict";

    sails.log.info("loading: " + data.model.name);

    Participant.create(data.model)
      .then(function (data) {
        "use strict";
        // sails.log.info("found: " + data.name);
        callback();
      })
      .catch(function (error) {
        sails.log.info(error.details);
      });

  }


};

