const validator = require( 'validator' );
const User = require( '../models/user.model' );
const Response = require( '../helpers/response.helper' );
const md5 = require( 'md5' );

module.exports = {
    validRegister : async ( req, res, next ) => {
        const data = req.body;

        let error = {};

        !validator.isEmail( data.email )
        &&
        Object.assign( error, { email : `email is wrong format` } );

        !data.name
        &&
        Object.assign( error, { name : `name is required` } );

        ( !data.password || data.password.length < 8 )
        &&
        Object.assign( error, { password : `password is wrong format` } );

        let checkExists = await User.findOne( { email : data.email } );

        if ( checkExists ) {
            return res.status( 401 ).send(
                Response.failure( {
                    email : `email already used`
                } )
            );
        }

        if ( Object.keys( error ).length > 0 ) {

            return res.status( 401 ).send(
                Response.failure( error )
            );
        }

        next();
    },
    validUpdate : async ( req, res, next ) => {
        const data = req.body;
        let error = {};

        ( data.email )
        &&
        Object.assign( error, { email : `email is not change` } );

        validator.isEmpty( data.name )
        &&
        Object.assign( error, { name : `name is required` } );

        data.password
        &&
        validator.isEmpty( data.password )
        &&
        Object.assign( error, { password : `password is required` } );

        if ( Object.keys( error ).length > 0 ) {
            return res.status( 401 ).send(
                Response.failure( error )
            );
        }

        if ( data.password )
            req.body.password = md5( data.password );

        next();
    },
    validLogin : async ( req, res, next ) => {
        const result = await User.findOne( {
            email : req.body.email
        } );

        if ( !result ) {
            return res.status( 401 ).send(
                Response.failure( {
                    email : "email is invalid",
                    data : req.body
                } )
            );
        }

        if ( result.password !== md5( req.body.password ) ) {
            return res.status( 401 ).send( {
                error : {
                    password : "password is invalid"
                },
                data : req.body
            } );
        }

        next();
    }
};