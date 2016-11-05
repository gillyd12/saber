/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'mongolabs',
    migrate: 'drop'
  },

  connections: {

    mongolabs: {
      adapter: 'sails-mongo',
      host: process.env.saber_mongo_host, // defaults to `localhost` if omitted
      port: process.env.saber_mongo_port, // defaults to 27017 if omitted
      user: process.env.saber_mongo_username, // or omit if not relevant
      password: process.env.saber_mongo_password, // or omit if not relevant
      database: process.env.saber_mongo_database // or omit if not relevant
    }
  },

   liftTimeout: 30000

};
