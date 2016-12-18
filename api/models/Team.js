/**
 * Team.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var teams;
var S = require('string');
var _ = require('underscore');

module.exports = {

  attributes: {

    short_name: {
      type: 'string',
      unique: true,
      primaryKey: true
    },

    full_name: {
      type: 'string'
    },

    city: {
      type: 'string'
    },

    maskot: {
      type: 'string'
    },

    division: {
      type: 'string'
    },

    league: {
      model: 'league'
    },

    // Add a reference to players
    players: {
      // collection: 'player',
      via: 'team'
    }

  },

  init: function (callback) {
    "use strict";

    this.teams = [
      {
        short_name: 'TOR',
        full_name: 'Toronto Blue Jays',
        city: 'Toronto',
        maskot: 'Blue Jays',
        division: 'East',
        league: 'AL'
      },
      {
        short_name: 'BOS',
        full_name: 'Boston Red Sox',
        city: 'Boston',
        maskot: 'Red Sox',
        division: 'East',
        league: 'AL'
      },
      {
        short_name: 'BAL',
        full_name: 'Baltimore Orioles',
        city: 'Baltimore',
        maskot: 'Orioles',
        division: 'East',
        league: 'AL'
      },
      {
        short_name: 'NYY',
        full_name: 'New York Yankees',
        city: 'New York',
        maskot: 'Yankees',
        division: 'East',
        league: 'AL'
      },
      {
        short_name: 'TBR',
        full_name: 'Tampa Bay Rays',
        city: 'Tampa Bay',
        maskot: 'Rays',
        division: 'East',
        league: 'AL'
      },

      {
        short_name: 'CLE',
        full_name: 'Cleveland Indians',
        city: 'Cleveland',
        maskot: 'Indians',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'DET',
        full_name: 'Detroit Tigers',
        city: 'Detroit',
        maskot: 'Tigers',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'KCR',
        full_name: 'Kansas City Royals',
        city: 'Kansas City',
        maskot: 'Royals',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'CHW',
        full_name: 'Chicago White Sox',
        city: 'Chicago',
        maskot: 'White Sox',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'MIN',
        full_name: 'Minnesota Twins',
        city: 'Minnesota',
        maskot: 'Twins',
        division: 'Central',
        league: 'AL'
      },

      {
        short_name: 'TEX',
        full_name: 'Texas Rangers',
        city: 'Texas',
        maskot: 'Rangers',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'HOU',
        full_name: 'Houston Astros',
        city: 'Houston',
        maskot: 'Astros',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'SEA',
        full_name: 'Seattle Mariners',
        city: 'Seattle',
        maskot: 'Mariners',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'LAA',
        full_name: 'Los Angeles Angels',
        city: 'Los Angeles',
        maskot: 'Angels',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'OAK',
        full_name: 'Oakland Athletics',
        city: 'Oakland',
        maskot: 'As',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'WAS',
        full_name: 'Washington Nationals',
        city: 'Washington',
        maskot: 'Nationals',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'NYM',
        full_name: 'New York Mets',
        city: 'New York',
        maskot: 'Mets',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'FLA',
        full_name: 'Florida Marlins',
        city: 'Florida',
        maskot: 'Marlins',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'PHI',
        full_name: 'Philadelphia Phillies',
        city: 'Philadelphia',
        maskot: 'Phillies',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'ATL',
        full_name: 'Atlanta Braves',
        city: 'Atlanta',
        maskot: 'Braves',
        division: 'East',
        league: 'NL'
      },

      {
        short_name: 'CHC',
        full_name: 'Chicago Cubs',
        city: 'Chicago',
        maskot: 'Cubs',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'STL',
        full_name: 'St. Louis Cardinals',
        city: 'St. Louis',
        maskot: 'Cardinals',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'PIT',
        full_name: 'Pittsburgh Pirates',
        city: 'Pittsburgh',
        maskot: 'Pirates',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'MIL',
        full_name: 'Milwaukee Brewers',
        city: 'Milwaukee',
        maskot: 'Brewers',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'CIN',
        full_name: 'Cincinnati Reds',
        city: 'Cincinnati',
        maskot: 'Reds',
        division: 'Central',
        league: 'NL'
      },

      {
        short_name: 'LAD',
        full_name: 'Los Angeles Dodgers',
        city: 'Los Angeles',
        maskot: 'Dodgers',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'SFG',
        full_name: 'San Francisco Giants',
        city: 'San Francisco',
        maskot: 'Giants',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'COL',
        full_name: 'Colorado Rockies',
        city: 'Colorado',
        maskot: 'Rockies',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'ARI',
        full_name: 'Arizona Diamondbacks',
        city: 'Arizona',
        maskot: 'Diamondbacks',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'SDP',
        full_name: 'San Diego Padres',
        city: 'San Diego',
        maskot: 'Padres',
        division: 'West',
        league: 'NL'
      }

    ]

    for (var team of this.teams) {
      Team.findOrCreate({short_name: team.short_name}, {
        short_name: team.short_name,
        full_name: team.full_name,
        city: team.city,
        maskot: team.maskot,
        division: team.division,
        league: team.league
      })
        .then(function (data) {
          "use strict";
          sails.log.info("loaded: " + data.short_name);
        })
        .catch(function (error) {
          sails.log.error(error.details);
        });
    }

    callback();

  },

  getFullname: function(shortname) {
    "use strict";
    return Team.find({short_name: shortname});
  },

  getTeams: function() {
    "use strict";
    return Team.find({});
  },

  getDivisionTeams: function(team) {
    "use strict";

    /* refactor this out of the model into a calculation service */

    var teamOfInterest = _.findWhere(this.teams, {short_name: team.toUpperCase()});

    var teamsOfInterest = _.where(this.teams, {division: teamOfInterest.division, league: teamOfInterest.league})

    var divisionTeams = _.filter(teamsOfInterest, function (teamOfInterest) {
      return teamOfInterest.short_name != team.toUpperCase()
    })

    return divisionTeams;

  }

};

