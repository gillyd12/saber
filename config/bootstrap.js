/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var parser = require("../api/services/ParserService");

module.exports.bootstrap = function(cb) {

  // pre-caching data
  sails.on('lifted', function() {
    loadSimGameResults();
  });

  function loadSimGameResults(){
    try {

      // start: load the file names in preparation for parsing
      parser.getDirectoryContentNames("input",  function(items) {
        "use strict";
        console.log(items);
      })

      // completed: move directory contents to output folder
      parser.moveDirectoryContent("input", "output");



    } catch (error) {
      sails.log.error(error);
    }
  }

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
