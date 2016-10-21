/**
 * League.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    // Add a reference to teams
    teams: {
      collection: 'team',
      via: 'league'
    }

  },

  init: function (callback, obj) {
    "use strict";

    for (var league of obj) {
      League.findOrCreate({name: league}, {name: league})
        .then(function (data) {
          "use strict";
          sails.log.info("loaded: " + data.name);
        })
        .catch(function (error) {
          sails.log.error(error.details);
        });
    }

    callback();

  },

  getTeams: function(league) {
    "use strict";
    return League.find({ where: { name: league }  }).populate('teams');
  }

};

