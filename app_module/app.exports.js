require( 'dotenv' ).config();
require( '../database/connect.db' );
const app = require( '../app_setup/app' );

//setup engine
require( '../app_setup/engine.app' );

//setup route
require( '../app_setup/route.app' );

// catch should be called after route
require( '../app_setup/catch.app' );

//port
// require( '../app_setup/port.app' );

module.exports = app;