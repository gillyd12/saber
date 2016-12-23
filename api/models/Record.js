/**
 * Created by bryangill on 12/23/16.
 */
/**
 * Record.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// var S = require('string');
// var _ = require('underscore');

module.exports = {

  attributes: {

    file_id: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    team: {
      model: 'team'
    },

    wins: {
      type: 'integer'
    },

    losses: {
      type: 'integer'
    },

    games_behind: {
      type: 'integer'
    },

    winning_pct: {
      type: 'integer'
    }
  },

  init: function (callback) {
    "use strict";

    callback();

  }

};

