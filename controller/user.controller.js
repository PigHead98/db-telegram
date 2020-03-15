const User = require( '../models/user.model' );
const Response = require( '../helpers/response.helper' );
const auth = require( "./auth.controller" );
const md5 = require( 'md5' );

module.exports = {
    index : async ( req, res, next ) => {
        let dataUsers = await User.find();
        return res.send( Response.success( dataUsers ) );
    },
    register : async ( req, res, next ) => {
        try {
            let data = req.body;
            data.password = md5( data.password );

            data.jwtToken = await auth.createToken( data );

            if ( data.jwtToken.error ) {
                // next(renderToken.error);
                return res.send(
                    Response.failure( data.jwtToken.error.message )
                );
            }

            let result = await User.create( data );

            return res.send( Response.success( result ) );
        } catch ( error ) {
            return res.send(
                Response.failure( error.message ) );
        }
    },
    update : async ( req, res, next ) => {
        try {
            const data = req.body;
            data.password = md5( data.password );
            let result = await User.updateOne( { _id : req.params.userId }, { $set : data } );

            return res.send(
                Response.success( result )
            );
        } catch ( e ) {
            return res.send( Response.failure( e.message ) );
        }
    }
};