const User = require( '../models/user.model' );
const auth = require( "./auth.controller" );
const md5 = require( 'md5' );
module.exports = {
    index : async ( req, res, next ) => {
        let dataUsers = await User.find();
        return res.send( {
            dataUsers
        } );
    },
    register : async ( req, res, next ) => {
        let data = req.body;
        data.password = md5( data.password );
        User.create( data, async ( err, onDone ) => {
            if ( !err ) {
                return res.send( {
                    status : "success",
                    result : await auth.createToken( data )
                } );
            }
            return res.send( {
                status : `failure ${ err }`,
                result : data
            } );
        } );
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