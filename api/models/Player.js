/**
* Player.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },

    team: {
      model: 'team'
    },

  },

  init: function () {
    "use strict";
      Player.findOrCreate({name: 'test name'}, {
        name: 'test name',
        team: 'BOS'
      })
        .then(function (data) {
          "use strict";
          sails.log.info("found: " + data.name);
        })
        .catch(function (error) {
          sails.log.error(error.details);
        });

  }

};

