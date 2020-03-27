const User = require( '../models/user.model' );
const { success, failure } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );
const auth = require( "./auth.controller" );

module.exports = {
    postCheckLogin : async ( req, res ) => {
        try {
            const result = await User.findOne( {
                email : req.body.email
            } );

            const createToken = await auth.createToken( result );

            const updateToken = await User.findByIdAndUpdate( result._id, {
                "jwtToken.accessToken" : createToken.accessToken,
                "state.online" : true
            }, { new : true } );

            return res.json(
                success( {
                        ...getDataBy( updateToken, "name", "_id", "contacts", "email", "avatar" ),
                        accessToken : createToken.accessToken,
                        refreshToken : createToken.refreshToken
                    }
                )
            );
        } catch ( e ) {
            return res.json(
                failure( e.message )
            );
        }
    },
    postLogout : async ( req, res ) => {
        try {
            const updateToken = await User.findByIdAndUpdate( req.params.userId, {
                "jwtToken.accessToken" : null,
                "state.online" : false
            }, { new : true } );

            return res.json(
                success(
                    `logout`
                )
            );
        } catch ( e ) {
            return res.json(
                failure( e.message )
            );
        }
    },
    refreshToken : async ( req, res ) => {
        try {
            const refreshTokenFromClient = req.body.refreshToken;

            const refreshToken = await auth.refreshToken( refreshTokenFromClient );

            if ( refreshToken.error ) {
                return res.json(
                    failure( refreshToken.error, `refreshToken_fails` )
                );
            }

            return res.json(
                success( refreshToken )
            );
        } catch ( e ) {
            return res.json(
                failure( e.message, `refreshToken_fails` )
            );
        }
    }
};