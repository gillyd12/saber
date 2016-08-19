/**
 * Created by bryangill on 8/11/16.
 */

var utilityService = require('./UtilityService');
var _ = require('lodash');

module.exports = {

  destroy: function (model) {
    "use strict";

    try {
      model.destroy()
        .then(function (data) {
          sails.log.info(model.adapter.identity + " destroyed");
        })
        .catch(function (error) {
          sails.log.error(error);
        });
    } catch (error) {
      sails.log.error(error);
    }
  },

  populate: function (model) {

    try {

      var records = model.load();

      sails.log.info("loading " + model.adapter.identity + " ...");

      _(records).forEach(function (value) {
        // sails.log.info("I went into new records id: " + value.id);
        var a;
        var res = {};
        model.map(a, res, value).then(function (data) {
          model.create(data.model)
            .then(function (data) {
            })
            .catch(function (error) {
              sails.log.error(error);
            });
        })
      })

      sails.log.info("loading " + model.adapter.identity + " completed");

    } catch (error) {
      sails.log.error(error);
    }
  },

  reload: function (model) {
    "use strict";
    try {
      // this.destroy(model);
      this.populate((model));
    } catch (error) {
      sails.info.error(error);
    }
  },

};

