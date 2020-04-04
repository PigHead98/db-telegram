const rateLimit = require( "express-rate-limit" );
const MongoStore = require( 'rate-limit-mongo' );

//max 10 req to api in 15min
const _apiLimiter = rateLimit( {
    store : new MongoStore( {
        uri : process.env.MONGODB_URI,
        resetExpireDateOnChange : true
    } ),
    windowMs : 15 * 60 * 1000,
    max : 10,
    message :
        "Too many accounts created from this IP, please try again after 15min"
} );

//limit register account
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

//limit login, 5 times at 15min
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