/**
 * Created by bryangill on 12/23/16.
 */

var rest = require('restling');
var utilityService = require('./UtilityService');
var parser = require("./ParserService");
var _ = require('lodash');
var S = require('string');

module.exports = {

  win: function (file_id, team_short_name) {
    /* this method determines whether a team has won for a given game */
    "use strict";
    var result = false;

    return new Promise(function (resolve, reject) {
      try {
        Team.getFullname(team_short_name)
          .then(function (team_full_name) {
            Game.find({file_id: file_id, winning_team: team_full_name})
              .then(function (game) {
                if (game) {
                  result = true;
                }
                resolve(result);
              })
          })
      } catch (error) {
        sails.log.error(error);
        reject(error);
      }
    })
  },

  loss: function (file_id, team_short_name) {
    /* this method determines whether a team has lost for a given game */
    "use strict";
    var result = false;

    return new Promise(function (resolve, reject) {
      try {
        Team.getFullname(team_short_name)
          .then(function (team_full_name) {
            Game.find({file_id: file_id, losing_team: team_full_name})
              .then(function (game) {
                if (game) {
                  result = true;
                }
                resolve(result);
              })
          })
      } catch (error) {
        sails.log.error(error);
        reject(error);
      }
    })
  },

  model_object: function (model) {
    "use strict";
    var self = this;

    var promise = new Promise(function (resolve, reject) {

      var obj = {
        game_id: model.filename,
        date: model.date_of_game,
        home_team: model.match_up.substr(model.match_up.indexOf(' at ')+4, model.match_up.length),
        home_score: model.score.substr(model.score.lastIndexOf('-')+1, model.score.length),
        visiting_team: model.match_up.substr(0, model.match_up.indexOf(' at ')),
        visiting_score: model.score.substr(model.match_up.indexOf(': ')-2, model.match_up.indexOf(': ')+2),
        winning_team: "",
        losing_team: "",
        winning_score: "",
        losing_score: ""
      }

      obj.home_score = self.determineHomeScore(obj, model);
      obj.visiting_score = self.determineVisitingScore(obj, model);
      obj.winning_team = self.determineWinner(obj);
      obj.losing_team = self.determineLoser(obj);
      obj.winning_score = self.determineWinningScore(obj);
      obj.losing_score = self.determineLosingScore(obj);

      res.model = obj;
      resolve(res);
    });
    return promise;
  },

  determineHomeScore: function (obj, model) {
    "use strict";

    try {
      var winner = model.score.substr(0, model.score.indexOf('WIN:')-1);

      if (S(obj.home_team.toLowerCase()).contains(winner.toLowerCase())) {
        return model.score.substring(model.score.indexOf(': ')+2, model.score.lastIndexOf('-'));
      } else {
        return model.score.substring(model.score.lastIndexOf('-')+1, model.score.length);
      }
    } catch (error) {
      sails.log.error(error);
    }

  },

  determineVisitingScore: function (obj, model) {
    "use strict";

    try {
      var winner = model.score.substr(0, model.score.indexOf('WIN:')-1);

      if (S(obj.visiting_team.toLowerCase()).contains(winner.toLowerCase())) {
        return model.score.substring(model.score.indexOf(': ')+2, model.score.lastIndexOf('-'));
      } else {
        return model.score.substring(model.score.lastIndexOf('-')+1, model.score.length);
      }
    } catch (error) {
      sails.log.error(error);
    }
  },

  determineWinner: function (obj) {
    "use strict";

    if (S(obj.home_score).toInt() > S(obj.visiting_score).toInt()) {
      return obj.home_team;
    } else {
      return obj.visiting_team;
    }

  },

  determineWinningScore: function (obj) {
    "use strict";

    if (S(obj.home_score).toInt() > S(obj.visiting_score).toInt()) {
      return S(obj.home_score).toInt();
    } else {
      return S(obj.visiting_score).toInt();
    }

  },

  determineLoser: function (obj) {
    "use strict";

    if (S(obj.home_score).toInt() > S(obj.visiting_score).toInt()) {
      return obj.visiting_team;
    } else {
      return obj.home_team;
    }

  },

  determineLosingScore: function (obj) {
    "use strict";

    if (S(obj.home_score).toInt() > S(obj.visiting_score).toInt()) {
      return S(obj.visiting_score).toInt();
    } else {
      return S(obj.home_score).toInt();
    }

  },

};
