/**
 * Created by bryangill on 8/11/16.
 */

var fs = require('fs');
var fse = require('fs-extra');
var parser = require("./ParserService");


module.exports = {

  loadSimGameResults: function () {

    'use strict'
    try {

      // start: load the file names in preparation for parsing
      parser.getDirectoryContentNames("input", function (items) {
        "use strict";
        sails.log.info(items);
      })

      // completed: move directory contents to output folder
      parser.moveDirectoryContent("input", "output");


    } catch (error) {
      sails.log.error(error);
    }

  }

};
