/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  // global params
  // count - limits the result
  // year - determines which year to use in the query
  //

  // /team/chc/record?count=30 - will get you the number of games the cubs won and lost in their last 30
  // /team/chc/record - will get you the current record for the cubs in the current year
  // /team/chc/record?year=2065 - will get you the record for the cubs in the year 2065
  'get /team/:abrv/record': {controller: 'TeamController', action: 'getTeamRecord', skipAssets: true},
  'get /team/:abrv/record/streak': {controller: 'TeamController', action: 'getStreak', skipAssets: true},

  // /league/al/ - you will get every team in the AL
  // 'get /league/:league': {controller: 'LeagueController', action: 'getLeague', skipAssets: true},
  // /league/al/division/east - you will get every team in the AL east
  'get /league/:league/division/:division': {controller: 'LeagueController', action: 'getDivision', skipAssets: true},

};
