/**
 * Created by bryangill on 8/11/16.
 */

var parser = require("./ParserService");
// var Q = require('q');
// var fs = require('fs');
// var S = require('string');

module.exports = {

  loadSimGameResults: function () {

    var scores = [];

    var s = '';

    var files = parser.getDirectoryContentNames("input");

    'use strict'

    sails.log.info(parser.getScores(files));

    // completed: move directory contents to output folder
    parser.moveDirectoryContent("input", "output");


  },

};


