const rateLimit = require( "express-rate-limit" );
const MongoStore = require( 'rate-limit-mongo' );

const _apiLimiter = rateLimit( {
    store : new MongoStore( {
        uri : process.env.MONGODB_URI,
        resetExpireDateOnChange : true
    } ),
    windowMs : 15 * 60 * 1000,
    max : 100,
    message :
        "Too many accounts created from this IP, please try again after 15min"
} );

const _createAccountLimiter = rateLimit( {
    store : new MongoStore( {
        uri : process.env.MONGODB_URI,
        resetExpireDateOnChange : true
    } ),
    windowMs : 60 * 1000,
    max : 100,
    message :
        "Too many accounts created from this IP, please try again after 1min"
} );

const _loginAccountLimiter = rateLimit( {
    store : new MongoStore( {
        uri : process.env.MONGODB_URI,
        resetExpireDateOnChange : true
    } ),
    skipSuccessfulRequests : true,
    windowMs : 15 * 60 * 1000,
    max : 5,
    message :
        "You have logged in wrong 5 times, please try again after 15 min"
} );

module.exports = {
    apiLimiter : _apiLimiter,
    createAccountLimiter : _createAccountLimiter,
    loginAccountLimiter : _loginAccountLimiter
};