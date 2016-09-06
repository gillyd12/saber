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
      unique: true,
      primaryKey: true
    },

    full_name: {
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
      collection: 'player',
      via: 'team'
    }

  },

  init: function () {
    "use strict";

    var teams = [
      {
        short_name: 'TOR',
        full_name: 'Toronto Blue Jays',
        division: 'East',
        league: 'AL'
      },
      {
        short_name: 'BOS',
        full_name: 'Boston Red Sox',
        division: 'East',
        league: 'AL'
      },
      {
        short_name: 'BAL',
        full_name: 'Baltimore Orioles',
        division: 'East',
        league: 'AL'
      },
      {
      short_name: 'NYY',
      full_name: 'New York Yankees',
      division: 'East',
      league: 'AL'
      },
      {
        short_name: 'TBR',
        full_name: 'Tampa Bay Rays',
        division: 'East',
        league: 'AL'
      },

      {
        short_name: 'CLE',
        full_name: 'Cleveland Indians',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'DET',
        full_name: 'Detroit Tigers',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'KCR',
        full_name: 'Kansas City Royals',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'CHW',
        full_name: 'Chicago White Sox',
        division: 'Central',
        league: 'AL'
      },
      {
        short_name: 'MIN',
        full_name: 'Minnesota Twins',
        division: 'Central',
        league: 'AL'
      },

      {
        short_name: 'TEX',
        full_name: 'Texas Rangers',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'HOU',
        full_name: 'Houston Astros',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'SEA',
        full_name: 'Seatle Mariners',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'LAA',
        full_name: 'Los Angeles Angels',
        division: 'West',
        league: 'AL'
      },
      {
        short_name: 'OAK',
        full_name: 'Oakland As',
        division: 'West',
        league: 'AL'
      },


      {
        short_name: 'WAS',
        full_name: 'Washington Nationals',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'NYM',
        full_name: 'New York Mets',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'FLA',
        full_name: 'Florida Marlins',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'PHI',
        full_name: 'Philadelphia Phillies',
        division: 'East',
        league: 'NL'
      },
      {
        short_name: 'ATL',
        full_name: 'Atlanta Braves',
        division: 'East',
        league: 'NL'
      },

      {
        short_name: 'CHC',
        full_name: 'Chicago Cubs',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'STL',
        full_name: 'St.Louis Cardinals',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'PIT',
        full_name: 'Pittsburgh Pirates',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'MIL',
        full_name: 'Milwaukee Brewers',
        division: 'Central',
        league: 'NL'
      },
      {
        short_name: 'CIN',
        full_name: 'Cincinnati Reds',
        division: 'Central',
        league: 'NL'
      },

      {
        short_name: 'LAD',
        full_name: 'Los Angeles Dodgers',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'SFG',
        full_name: 'San Francisco Giants',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'COL',
        full_name: 'Colorado Rockies',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'ARI',
        full_name: 'Arizona Diamondbacks',
        division: 'West',
        league: 'NL'
      },
      {
        short_name: 'SDP',
        full_name: 'San Diego Padres',
        division: 'West',
        league: 'NL'
      }

    ]

    for (var team of teams) {
      Team.findOrCreate({short_name: team.short_name}, {
        short_name: team.short_name,
        full_name: team.full_name,
        division: team.division,
        league: team.league
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

