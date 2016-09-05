/**
* Team.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    short_name: {
      type: 'string',
      unique: true
    },

    full_name: {
      type: 'string'
    },

    division: {
      type: 'string'
    },

    contract: {
      model: 'league'
    },

    // Add a reference to players
    players: {
      collection: 'player',
      via: 'member'
    }

  },

  init: function () {
    "use strict";

    var teams = [
      {
        short_name: 'TOR',
        full_name: 'Toronto Blue Jays',
        division: 'East',
        contract: 'AL'
      },
      {
        short_name: 'BOS',
        full_name: 'Boston Red Sox',
        division: 'East',
        contract: 'AL'
      },
      {
        short_name: 'BAL',
        full_name: 'Baltimore Orioles',
        division: 'East',
        contract: 'AL'
      },
      {
      short_name: 'NYY',
      full_name: 'New York Yankees',
      division: 'East',
      contract: 'AL'
      },
      {
        short_name: 'TBR',
        full_name: 'Tampa Bay Rays',
        division: 'East',
        contract: 'AL'
      },

      {
        short_name: 'CLE',
        full_name: 'Cleveland Indians',
        division: 'Central',
        contract: 'AL'
      },
      {
        short_name: 'DET',
        full_name: 'Detroit Tigers',
        division: 'Central',
        contract: 'AL'
      },
      {
        short_name: 'KCR',
        full_name: 'Kansas City Royals',
        division: 'Central',
        contract: 'AL'
      },
      {
        short_name: 'CHW',
        full_name: 'Chicago White Sox',
        division: 'Central',
        contract: 'AL'
      },
      {
        short_name: 'MIN',
        full_name: 'Minnesota Twins',
        division: 'Central',
        contract: 'AL'
      },

      {
        short_name: 'TEX',
        full_name: 'Texas Rangers',
        division: 'West',
        contract: 'AL'
      },
      {
        short_name: 'HOU',
        full_name: 'Houston Astros',
        division: 'West',
        contract: 'AL'
      },
      {
        short_name: 'SEA',
        full_name: 'Seatle Mariners',
        division: 'West',
        contract: 'AL'
      },
      {
        short_name: 'LAA',
        full_name: 'Los Angeles Angels',
        division: 'West',
        contract: 'AL'
      },
      {
        short_name: 'OAK',
        full_name: 'Oakland As',
        division: 'West',
        contract: 'AL'
      },


      {
        short_name: 'WAS',
        full_name: 'Washington Nationals',
        division: 'East',
        contract: 'NL'
      },
      {
        short_name: 'NYM',
        full_name: 'New York Mets',
        division: 'East',
        contract: 'NL'
      },
      {
        short_name: 'FLA',
        full_name: 'Florida Marlins',
        division: 'East',
        contract: 'NL'
      },
      {
        short_name: 'PHI',
        full_name: 'Philadelphia Phillies',
        division: 'East',
        contract: 'NL'
      },
      {
        short_name: 'ATL',
        full_name: 'Atlanta Braves',
        division: 'East',
        contract: 'NL'
      },

      {
        short_name: 'CHC',
        full_name: 'Chicago Cubs',
        division: 'Central',
        contract: 'NL'
      },
      {
        short_name: 'STL',
        full_name: 'St.Louis Cardinals',
        division: 'Central',
        contract: 'NL'
      },
      {
        short_name: 'PIT',
        full_name: 'Pittsburgh Pirates',
        division: 'Central',
        contract: 'NL'
      },
      {
        short_name: 'MIL',
        full_name: 'Milwaukee Brewers',
        division: 'Central',
        contract: 'NL'
      },
      {
        short_name: 'CIN',
        full_name: 'Cincinnati Reds',
        division: 'Central',
        contract: 'NL'
      },

      {
        short_name: 'LAD',
        full_name: 'Los Angeles Dodgers',
        division: 'West',
        contract: 'NL'
      },
      {
        short_name: 'SFG',
        full_name: 'San Francisco Giants',
        division: 'West',
        contract: 'NL'
      },
      {
        short_name: 'COL',
        full_name: 'Colorado Rockies',
        division: 'West',
        contract: 'NL'
      },
      {
        short_name: 'ARI',
        full_name: 'Arizona Diamondbacks',
        division: 'West',
        contract: 'NL'
      },
      {
        short_name: 'SDP',
        full_name: 'San Diego Padres',
        division: 'West',
        contract: 'NL'
      }

    ]

    for (var team of teams) {
      Team.findOrCreate({short_name: team.short_name}, {
        short_name: team.short_name,
        full_name: team.full_name,
        division: team.division,
        contract: team.contract
      })
        .then(function (data) {
          "use strict";
          sails.log.info("found: " + data.short_name);
        })
        .catch(function (error) {
          sails.log.error(error.details);
        });
    }

  }


};

