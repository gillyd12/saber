/**
 * Created by bryangill on 8/11/16.
 */

var utilityService = require('./UtilityService');
var parser = require("./ParserService");
var S = require('string');

var _ = require('lodash');

module.exports = {

  destroy: function (model) {
    "use strict";

    try {
      model.destroy()
        .then(function (data) {
          // sails.log.info(model.adapter.identity + " destroyed");
        })
        .catch(function (error) {
          sails.log.error(error);
        });
    } catch (error) {
      sails.log.error(error);
    }
  },

  count: function (model, team) {
    "use strict";
    model.count({ winning_team: team })
      .then(function (data) {
        "use strict";
        // sails.log.info("found: " + data);
      })
      .catch(function (error) {
        sails.log.error(error.details);
      });

  },

  populate: function (callback, model) {

    try {

      var records = model.load(parser);

      // todo need to null this out at some point?
      var prefix_load = new Map();

      // sails.log.info("loading " + model.adapter.identity + " ...");

      if (records && records.length > 0) {
        _(records).forEach(function (value) {
          var a;
          var res = {};
          if (!S(value.filename).contains('0716A')) {
            model.map(a, res, value).then(function (data) {
              "use strict";
              model.populate(callback, data, prefix_load);
            })
          }
        })
      } else {
        // empty folder
        callback();
      }

    } catch (error) {
      sails.log.error(error);
    }
  },

  reload: function (callback, model) {
    "use strict";
    try {
      this.populate(callback, model);
    } catch (error) {
      sails.info.error(error);
    }
  },

};

