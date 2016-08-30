/**
 * Created by bryangill on 1/16/16.
 */

var rest = require('restling');

var root = process.env.ROOT_URL;

module.exports = {

  getRoot: function () {
    "use strict";
    return root;
  },

  get: function (path, params) {
    "use strict";

    var url = this.getRoot() + path;

    sails.log.info('Retrieving API data at: ' + this.getRoot());

    var options = {
      query: params
    };

    try {
      return rest.get(url, options);
    } catch (error) {
      sails.log.error(error);
    }

  }

};
