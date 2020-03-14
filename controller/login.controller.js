const User = require( '../models/user.model' );
const Response = require( '../helpers/response.helper' );
const auth = require( "./auth.controller" );

module.exports = {
    postCheckLogin : async ( req, res, next ) => {
        try {
            const result = await User.findOne( {
                email : req.body.email
            } );

            const createToken = await auth.createToken( result );
            await User.findByIdAndUpdate( result._id, {
                "jwtToken.accessToken" : createToken.accessToken
            } );

            return res.send(
                Response.success( createToken )
            );
        } catch ( e ) {
            return res.send(
                Response.failure( e.message )
            );
        }
    },
    refreshToken : async ( req, res ) => {
        try {
            const refreshTokenFromClient = req.body.refreshToken;
            return res.send(
                Response.success( await auth.refreshToken( refreshTokenFromClient ) )
            );
        } catch ( e ) {
            return res.send(
                Response.failure( e.message )
            );
        }
    }
};