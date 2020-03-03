const user = require( '../models/user.model' );
const jwtHelper = require( "../helpers/jwt.helper" );
const auth = require( "./auth.controller" );
let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";
const md5 = require( 'md5' );
module.exports = {
    postCheckLogin : async ( req, res, next ) => {
        try {

            let result = await user.findOne( {
                email : req.body.email
            } );

            if ( !result ) {
                return res.send( {
                    error : {
                        email : "email is invalid"
                    },
                    data : req.body
                } );
            }

            if ( result.password !== md5( req.body.password ) ) {
                return res.send( {
                    error : {
                        password : "password is invalid"
                    },
                    data : req.body
                } );
            }

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