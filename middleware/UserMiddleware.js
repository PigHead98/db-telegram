const { isEmail, isMongoId } = require( 'validator' );
const User = require( '../models/user.model' );
const { success, failure } = require( '../helpers/response.helper' );
const md5 = require( 'md5' );

module.exports = {
    validRegister : async ( req, res, next ) => {
        const data = req.body;

        let error = {};

        !isEmail( data.email )
        &&
        Object.assign( error, { email : `email is wrong format` } );

        !data.name
        &&
        Object.assign( error, { name : `name is required` } );

        ( !data.password || data.password.toString().length < 8 )
        &&
        Object.assign( error, { password : `password is wrong format` } );

        let checkExists = await User.findOne( { email : data.email } );

        if ( checkExists ) {
            return res.status( 401 ).send(
                failure( `email already used`, `email_exists`
                )
            );
        }

        if ( Object.keys( error ).length > 0 ) {

            return res.status( 401 ).send(
                failure( error, `data_wrong` )
            );
        }

        next();
    },
    validUpdate : ( req, res, next ) => {
        try {
            if ( !isMongoId( req.params.userId ) ) {
                return res.status( 403 ).send(
                    failure( `user id wrong format`, `userId_wrong` )
                );
            }
            const data = req.body;
            delete data["email"]; //not change email in this route
            delete data["jwtToken"]; //not change jwtToken in this route
            delete data["contacts"]; //not change contacts in this route
            delete data["avatar"]; //not change avatar in this route

            !data.name
            &&
            delete data["name"];

            !data.phone
            &&
            delete data["phone"];

            !data.apiVer
            &&
            delete data["apiVer"];

            ( !data.password || data.password.toString().length < 8 )
            &&
            delete data["password"];

            if ( data.password )
                req.body.password = md5( data.password );

            next();
        } catch ( e ) {
            return res.status( 401 ).send(
                failure( e.message )
            );
        }

    },
    validLogin : async ( req, res, next ) => {
        const result = await User.findOne( {
            email : req.body.email
        } );

        if ( !result ) {
            return res.status( 401 ).send(
                failure( {
                    email : "email is invalid",
                    data : req.body.email
                }, `email_invalid` )
            );
        }

        if ( result.password !== md5( req.body.password ) ) {
            return res.status( 401 ).send(
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
            return res.status( 403 ).send(
                failure( `user id wrong format`, `userId_wrong` )
            );
        }

        next();
    }
};