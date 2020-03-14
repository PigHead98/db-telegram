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
        let data = {
            name : "test_u",
            phone : "test_u",
            email : "test_u",
            password : "test_u",
            image : "test_u",
        };

        User.updateOne( { _id : '5e6b3c991632ac35c085c8da' }, { $set : data }, function ( err, onDone ) {
            if ( err ) throw err;
            return res.send( {
                status : 'success'
            } );
        } );
    }
};