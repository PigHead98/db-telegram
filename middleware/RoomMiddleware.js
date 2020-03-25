const { checkSchema } = require( 'express-validator' );
const validator = require( 'validator' );
const User = require( '../models/user.model' );
const Response = require( '../helpers/response.helper' );
const md5 = require( 'md5' );

// be coding

module.exports = {
    // validSchema : checkSchema({
    //     name : {
    //         type : String,
    //         trim : true,
    //         lowercase : true,
    //         required : true
    //     },
    //     topic : String,
    //     avatar : String,
    //     state : {
    //         online : {
    //             type : Boolean,
    //             default : false
    //         },
    //         available : {
    //             type : Boolean,
    //             default : true
    //         }
    //     },
    //     messages : Array,
    //     users : Array,
    // }),
    // validCreate : async ( req, res, next ) => {
    //     const data = req.body;
    //
    //     let error = [];
    //
    //     next();
    // },
    // validUpdate : async ( req, res, next ) => {
    //     const data = req.body;
    //
    //     let error = [];
    //
    //     ( data.email )
    //     &&
    //     error.push( {
    //         email : `email is not change`
    //     } );
    //
    //     validator.isEmpty( data.name )
    //     &&
    //     error.push( {
    //         name : `name is required`
    //     } );
    //
    //     data.password
    //     &&
    //     validator.isEmpty( data.password )
    //     &&
    //     error.push( {
    //         password : `password is required`
    //     } );
    //
    //     if ( error.length > 0 ) {
    //         return res.status( 401 ).send(
    //             Response.failure( error )
    //         );
    //     }
    //
    //     if ( data.password )
    //         req.body.password = md5( data.password );
    //     console.log( 1 );
    //     next();
    // },
    // validLogin : async ( req, res, next ) => {
    //     const result = await User.findOne( {
    //         email : req.body.email
    //     } );
    //
    //     if ( !result ) {
    //         return res.status( 401 ).send(
    //             Response.failure( {
    //                 email : "email is invalid",
    //                 data : req.body
    //             } )
    //         );
    //     }
    //
    //     if ( result.password !== md5( req.body.password ) ) {
    //         return res.status( 401 ).send( {
    //             error : {
    //                 password : "password is invalid"
    //             },
    //             data : req.body
    //         } );
    //     }
    //
    //     next();
    // }
};