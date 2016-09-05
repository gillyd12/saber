/**
* Team.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    short_name: {
      type: 'string',
      unique: true
    },

    full_name: {
      type: 'string'
    },

    location: {
      type: 'string'
    },

    maskot: {
      type: 'string'
    },

    // Add a reference to players
    players: {
      collection: 'player'
    },

    contract: {
      model: 'league'
    }
  }
};

