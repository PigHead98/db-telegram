const { checkSchema } = require( 'express-validator' );
const { isMongoId } = require( 'validator' );
const User = require( '../models/user.model' );
const { failure } = require( '../helpers/response.helper' );

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
    validCreateRoom : ( req, res, next ) => {
        const { name, users } = req.body;

        let error = {};

        !name
        &&
        Object.assign( error, { name : `name room is required` } );


        !users
        &&
        Object.assign( error, { users : `users room is required` } );

        users
        &&
        !Array.isArray( users )
        &&
        Object.assign( error, { users : `users room is array` } );

        if ( Object.keys( error ).length > 0 ) {

            return res.status( 401 ).send(
                failure( error, `data_wrong` )
            );
        }

        // check if array user have values that are not type mongo id
        let check = users.every( item => isMongoId( item ) );

        // remove id user that exists in array
        let removeUserExists = [ ...new Set( users ) ];

        if ( !check || removeUserExists.length !== users.length ) {
            return res.status( 401 ).send(
                failure( { users : `users wrong format` }, `data_wrong` )
            );
        }

        next();
    },
    validCreateRoom2Users : ( req, res, next ) => {
        const { from, to } = req.body;


        // check if array user have values that are not type mongo id
        let check = [ from, to ].every( item => isMongoId( item ) );

        if ( !check || from === to ) {
            return res.status( 401 ).send(
                failure( { users : `users wrong format` }, `data_wrong` )
            );
        }

        next();
    },
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