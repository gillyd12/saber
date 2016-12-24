/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  models: {
    connection: 'mongolabs',
    migrate: 'safe'
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

  log: {
    level: "silent"
  },

  liftTimeout: 60000

};
