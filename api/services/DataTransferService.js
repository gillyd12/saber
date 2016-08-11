/**
 * Created by bryangill on 8/11/16.
 */

var parser = require("./ParserService");

module.exports = {

  loadSimGameResults: function () {

    'use strict'

    try {

      // start: load the file names in preparation for parsing
      parser.getDirectoryContentNames("input").then(function (items) {

        try {
          parser.readRows(items).then(function() {
            // completed: move directory contents to output folder
            parser.moveDirectoryContent("input", "output");
          })
        } catch (error) {
          sails.log.error(error);
        }
      });

    } catch (error) {
      sails.log.error(error);
    }

  }

};

