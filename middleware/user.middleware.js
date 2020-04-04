const { isEmail, isMongoId } = require( 'validator' );
const User = require( '../models/user.model' );
const { failure } = require( '../helpers/response.helper' );
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
    validUpdate : async ( req, res, next ) => {
        try {
            if ( !isMongoId( req.params.userId ) || req.params.userId !== req.jwtDecoded._id ) {
                return res.status( 403 ).json(
                    failure( `user id wrong format`, `userId_wrong` )
                );
            }
            const data = req.body;
            // the value that do not change in this route
            delete data["email"];
            delete data["jwtToken"];
            delete data["contacts"];
            delete data["avatar"];
            delete data["password"];

            !data.name && delete data["name"];

            !data.phone && delete data["phone"];

            !data.apiVer && delete data["apiVer"];

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