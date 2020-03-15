require( 'dotenv' ).config();
require( './database/connect.db' );
const modules = require( './app_module/exports.node_module' );
const middlewares = require( './app_module/exports.midddleware' );
const routes = require( './app_module/exports.route' );

const app = modules.express();

// view engine setup
app.set( 'views', modules.path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( modules.logger( 'dev' ) );
app.use( modules.express.json() );
app.use( modules.express.urlencoded( { extended : false } ) );
app.use( modules.cookieParser() );
app.use( modules.express.static( modules.path.join( __dirname, 'public' ) ) );

//limit call api
app.use( middlewares.RateLimitMiddleware.apiLimiter );

//router
app.use( '/', modules.cors(), routes.indexRouter );
app.use( '/users', modules.cors(), routes.usersRouter );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
    next( modules.createError( 404 ) );
} );

// error handler
app.use( function ( err, req, res, next ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // render the error page
    res.status( err.status || 500 );
    res.render( 'error' );
} );

module.exports = app;
