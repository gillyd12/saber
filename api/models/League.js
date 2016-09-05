/**
 * League.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },

    // Add a reference to teams
    teams: {
      collection: 'team',
      via: 'contract'
    }

  },

  init: function (obj) {
    "use strict";

    for (var league of obj) {
      League.findOrCreate({name: league}, {name: league})
        .then(function (data) {
          "use strict";
          sails.log.info("found: " + data.name);
        })
        .catch(function (error) {
          sails.log.error(error.details);
        });
    }

  }

};

