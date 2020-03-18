const app = require( './app' );
const {
    cookieParser,
    express,
    logger,
    path
} = require( '../app_module/node_module.exports' );

// view engine setup
app.set( 'views', path.join( __dirname, '../views' ) );
app.set( 'view engine', 'jade' );

app.use( [
    logger( 'dev' ),
    express.json(),
    express.urlencoded( { extended : false } ),
    cookieParser(),
    express.static( path.join( __dirname, '../public' ) )
] );

//limit call api
// app.use( middlewares.RateLimitMiddleware.apiLimiter );

