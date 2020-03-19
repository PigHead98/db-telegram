const User = require( '../models/user.model' );
const { success, failure } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );
const auth = require( "./auth.controller" );

module.exports = {
    postCheckLogin : async ( req, res, next ) => {
        try {
            const result = await User.findOne( {
                email : req.body.email
            } );

            const createToken = await auth.createToken( result );

            const updateToken = await User.findByIdAndUpdate( result._id, {
                "jwtToken.accessToken" : createToken.accessToken
            }, { new : true } );

            return res.send(
                success( getDataBy( updateToken, "avatar", "_id", "contacts", "email", "jwtToken", "name" ) )
            );
        } catch ( e ) {
            return res.send(
                failure( e.message )
            );
        }
    },
    refreshToken : async ( req, res ) => {
        try {
            const refreshTokenFromClient = req.body.refreshToken;

            const refreshToken = await auth.refreshToken( refreshTokenFromClient );

            if ( refreshToken.error ) {
                return res.send(
                    failure( refreshToken.error, `refreshToken_fails` )
                );
            }

            return res.send(
                success( refreshToken )
            );
        } catch ( e ) {
            return res.send(
                failure( e.message, `refreshToken_fails` )
            );
        }
    }
};