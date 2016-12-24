/**
 * Created by bryangill on 12/24/16.
 */

var rest = require('restling');
var utilityService = require('./UtilityService');
var parser = require("./ParserService");
var _ = require('lodash');
var S = require('string');

module.exports = {

  calculateWinningPct: function(wins, loses) {
    "use strict";
    var pct = .999;

    if (wins && loses) {
      pct = (wins / (wins + loses))
    }

    return pct;
  }


};
