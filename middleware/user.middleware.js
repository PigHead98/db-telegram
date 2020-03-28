const { isEmail, isMongoId } = require( 'validator' );
const User = require( '../models/user.model' );
const { success, failure } = require( '../helpers/response.helper' );
const md5 = require( 'md5' );

module.exports = {
    validRegister : async ( req, res, next ) => {
        const { email, name, password } = req.body;

        let error = {};

        !isEmail( email ) && Object.assign( error, { email : `email is wrong format` } );

        !name && Object.assign( error, { name : `name is required` } );

        ( !password || password.toString().length < 8 )
        &&
        Object.assign( error, { password : `password is wrong format` } );

        let checkExists = await User.findOne( { email : email } );

        if ( checkExists ) {
            return res.status( 401 ).json(
                failure( `email already used`, `email_exists`
                )
            );
        }

        if ( Object.keys( error ).length > 0 ) {

            return res.status( 401 ).json(
                failure( error, `data_wrong` )
            );
        }

        next();
    },
    validUpdate : ( req, res, next ) => {
        try {
            if ( !isMongoId( req.params.userId ) ) {
                return res.status( 403 ).json(
                    failure( `user id wrong format`, `userId_wrong` )
                );
            }
            const data = req.body;
            delete data["email"]; //not change email in this route
            delete data["jwtToken"]; //not change jwtToken in this route
            delete data["contacts"]; //not change contacts in this route
            delete data["avatar"]; //not change avatar in this route

            !data.name && delete data["name"];

            !data.phone && delete data["phone"];

            !data.apiVer && delete data["apiVer"];

            ( !data.password || data.password.toString().length < 8 )
            &&
            delete data["password"];

            if ( data.password ) {
                req.body.password = md5( data.password );
            }

            next();
        } catch ( e ) {
            return res.status( 401 ).json(
                failure( e.message )
            );
        }

    },
    validLogin : async ( req, res, next ) => {
        const result = await User.findOne( {
            email : req.body.email
        } );

        if ( !result ) {
            return res.status( 401 ).json(
                failure( {
                    email : "email is invalid",
                    data : req.body.email
                }, `email_invalid` )
            );
        }

        if ( result.password !== md5( req.body.password ) ) {
            return res.status( 401 ).json(
                failure( {
                    password : "password is invalid",
                    data : req.body.password
                }, `password_invalid` )
            );
        }

        next();
    },
    validLogout : async ( req, res, next ) => {
        if ( !isMongoId( req.params.userId ) ) {
            return res.status( 403 ).json(
                failure( `user id wrong format`, `userId_wrong` )
            );
        }

        next();
    }
};