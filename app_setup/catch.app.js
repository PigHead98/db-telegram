const app = require( './app' );
const {
    catch_404,
    catch_error
} = require( '../app_module/catch.exports' );

// catch error
app.use( [
    catch_404,
    catch_error
] );
