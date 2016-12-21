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

module.exports.bootstrap = function (cb) {

  async.series([
    function (callback) {
      League.init(callback, ['AL', 'NL']);
    },
    function (callback) {
      Team.init(callback);
    },
    function (callback) {
      dataService.reload(callback, Game);
    },
    function (callback) {
      dataService.reload(callback, Player);
    },
    function (callback) {
      dataService.reload(callback, Participant);
    },
    function (callback) {
      parser.moveDirectoryContent(callback, "input", "output");
    },
    function (callback) {
      return cb();
    }
  ])
};
