const rateLimit = require( "express-rate-limit" );
const MongoStore = require('rate-limit-mongo');

const _apiLimiter = rateLimit( {
    store: new MongoStore({
        uri : process.env.MONGO_URI,
        resetExpireDateOnChange : true
    }),
    windowMs : 15 * 60 * 1000,
    max : 100,
    message :
        "Too many accounts created from this IP, please try again after 15min"
} );

const _createAccountLimiter = rateLimit( {
    store: new MongoStore({
        uri : process.env.MONGO_URI,
        resetExpireDateOnChange : true
    }),
    windowMs : 60 * 1000,
    max : 100,
    message :
        "Too many accounts created from this IP, please try again after 1min"
} );

module.exports = {
    apiLimiter : _apiLimiter,
    createAccountLimiter : _createAccountLimiter
};