const User = require( '../models/user.model' );
const { success, failure } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );
const auth = require( "./auth.controller" );
const md5 = require( 'md5' );

module.exports = {
    index : async ( req, res, next ) => {
        try {
            let dataUsers = await User.find();
            return res.send( success( dataUsers ) );
        } catch ( e ) {
            next( e )
        }
    },
    register : async ( req, res, next ) => {
        try {
            let data = req.body;
            data.password = md5( data.password );
            data.jwtToken = await auth.createToken( data );

            if ( data.jwtToken.error ) {
                // next(renderToken.error);
                return res.status( 401 ).send(
                    failure( {
                        message : data.jwtToken.error.message
                    } )
                );
            }

            let result = await User.create( data );

            result.id = result._id;

            return res.send( success( getDataBy( result, "contacts", "id", "name", "email", "jwtToken", ) ) );
        } catch ( error ) {
            return res.status( 401 ).send(
                failure( {
                    message : error.message
                } ) );
        }
    },
    update : async ( req, res, next ) => {
        try {
            const data = req.body;

            let result = await User.updateOne( { _id : req.params.userId }, { $set : data } );

            return res.send(
                success( result )
            );
        } catch ( e ) {
            return res.status( 401 ).send( failure( {
                message : e.message
            } ) );
        }
    },
    search_contact : async ( req, res, next ) => {
        try {
            let result = await User.findOne( {
                $or : [
                    {
                        email : req.params.value
                    },
                    {
                        phone : req.params.value
                    }
                ]
            }, 'name email avatar' );

            return res.send(
                success( result )
            );

        } catch ( e ) {
            return res.status( 401 ).send( failure( {
                message : e.message
            } ) );
        }
    }
};