/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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

  }
};

