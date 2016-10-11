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

var dataService = require("../api/services/DataTransferService");
var parser = require("../api/services/ParserService");

module.exports.bootstrap = function(cb) {

  // pre-caching data
  sails.on('lifted', function() {

    async.series([
      function(callback) {
        dataService.reload(callback, Game);
      },
      function(callback) {
        League.init(callback, ['AL', 'NL']);
      },
      function(callback) {
        Team.init(callback);
      },
      function(callback) {
        dataService.reload(callback, Player);
      },
      // function(callback) {
      //   parser.moveDirectoryContent(callback, "input", "output");
      // }
    ])
  });


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
