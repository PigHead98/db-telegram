const jwtHelper = require( "../helpers/jwt.helper" );
const { failure } = require( '../helpers/response.helper' );
const User = require( '../models/user.model' );
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

module.exports = {

    // use this to check user have accept token
    isAuth : async ( req, res, next ) => {

        //get token form client
        const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];

        const checkExists = await User.findOne( {
            "jwtToken.accessToken" : tokenFromClient
        } );

        if ( tokenFromClient && checkExists ) {
            try {

                // verify token to check accept token
                const decoded = await jwtHelper.verifyToken( tokenFromClient, accessTokenSecret );
                req.jwtDecoded = decoded.data;
                console.log(req.jwtDecoded);
                next();
            } catch ( error ) {
                return res.status( 401 ).json( failure( error, `verifyToken_fails` ) );
            }
        } else {
            return res.status( 403 ).json( failure( 'No token provided.', `auth_fails` ) );
        }
    }
};