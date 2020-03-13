const user = require( '../models/user.model' );
const jwtHelper = require( "../helpers/jwt.helper" );
const auth = require( "./auth.controller" );
let tokenList = {};

const md5 = require( 'md5' );
module.exports = {
    postCheckLogin : async ( req, res, next ) => {
        try {
            return res.send(
                await auth.createToken( result )
            );
        } catch ( e ) {
            return res.send( {
                error : e
            } );
        }
    },
    refreshToken : async ( req, res ) => {
        const refreshTokenFromClient = req.body.refreshToken;
        return res.send(
            await auth.refreshToken( refreshTokenFromClient )
        );
    }
};