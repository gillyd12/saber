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
      sails.log.info('Loading League');
      League.init(callback, ['AL', 'NL']);
    },
    function (callback) {
      sails.log.info('Loading Team');
      Team.init(callback);
    },
    function (callback) {
      sails.log.info('Loading Game');
      dataService.reload(callback, Game);
    },
    function (callback) {
      sails.log.info('Loading Statistic');
      dataService.reload(callback, Statistic);
    },
    function (callback) {
      sails.log.info('Loading Record');
      dataService.reload(callback, Record);
    },
    // function (callback) {
    //   sails.log.info('Record was loaded.');
    //   dataService.reload(callback, Player);
    // },
    // function (callback) {
    //   sails.log.info('Player was loaded.');
    //   dataService.reload(callback, Participant);
    // },
    // function (callback) {
    //   sails.log.info('Participant was loaded.');
    //   parser.moveDirectoryContent(callback, "input", "output");
    // },
    function (callback) {
      sails.log.info('Parsing is completed.');
      return cb();
    }
  ])
};
