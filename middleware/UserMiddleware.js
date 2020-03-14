const validator = require( 'validator' );
const User = require( '../models/user.model' );
const Response = require( '../helpers/response.helper' );
const md5 = require( 'md5' );

module.exports = {
    validRegister : async ( req, res, next ) => {
        const data = req.body;

        let error = [];

        !validator.isEmail( data.email )
        &&
        error.push( {
            email : `email is wrong format`
        } );

        validator.isEmpty( data.name )
        &&
        error.push( {
            password : `name is required`
        } );


        validator.isEmpty( data.password )
        &&
        error.push( {
            password : `password is required`
        } );


        let checkExists = await User.findOne( { email : data.email } );

        if ( checkExists ) {
            error.push( {
                email : `email already used`
            } );
        }

        if ( error.length > 0 ) {
            return res.send(
                Response.failure( error )
            );
        }

        next();
    },
    validLogin : async ( req, res, next ) => {
        const result = await User.findOne( {
            email : req.body.email
        } );

        if ( !result ) {
            return res.send(
                Response.failure( {
                    email : "email is invalid",
                    data : req.body
                } )
            );
        }

        if ( result.password !== md5( req.body.password ) ) {
            return res.send( {
                error : {
                    password : "password is invalid"
                },
                data : req.body
            } );
        }

        next();
    }
};