const jwtHelper = require( "../helpers/jwt.helper" );
const { success, failure } = require( '../helpers/response.helper' );
const User = require( '../models/user.model' );
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

module.exports = {
    isAuth : async ( req, res, next ) => {
        const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
        const checkExists = await User.findOne( {
            "jwtToken.accessToken" : tokenFromClient
        } );

        if ( tokenFromClient && checkExists ) {
            try {

                const decoded = await jwtHelper.verifyToken( tokenFromClient, accessTokenSecret );
                req.jwtDecoded = decoded;
                next();
            } catch ( error ) {
                return res.status( 401 ).send( failure( error, `verifyToken_fails` ) );
            }
        } else {
            return res.status( 403 ).send( failure( 'No token provided.', `auth_fails` ) );
        }
    }
};