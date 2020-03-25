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
    register : async ( req, res ) => {
        try {
            // get data form client
            let data = req.body;

            // all data was checked by middleware so here only to save at db
            data.password = md5( data.password ); // encode md5
            data.jwtToken = await auth.createToken( data ); // create token jwt to check auth user

            // when have error at create token
            if ( data.jwtToken.error ) {
                // next(renderToken.error);
                return res.status( 401 ).send(
                    failure( data.jwtToken.error.message, `createToken_fails` )
                );
            }

            let result = await User.create( data );

            return res.send( success( getDataBy( result, "contacts", "_id", "name", "email", "jwtToken", ) ) );
        } catch ( error ) {
            return res.status( 401 ).send(
                failure( error.message, `register_fails` ) );
        }
    },
    update : async ( req, res ) => {
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
    search_contact : async ( req, res ) => {
        try {
            // this api to response contact when client search ( by email or phone )
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
    },
    update_contact : async ( req, res ) => {
        try {
            // this api to do 2 mission that are add contact or remove contact from list user contact
            let update;
            switch ( req.params.update ) {
                case "add" :
                    update = {
                        $addToSet : {
                            "contacts" : req.params.to
                        }
                    };
                    break;
                case "remove" :
                    update = {
                        $pull : {
                            "contacts" : req.params.to
                        }
                    };
                    break;
                default:
                    return res.status( 401 ).send( failure( `This route only use for remove or add`, 'route_fails' ) );
            }
            const updateUser = await User.findByIdAndUpdate( req.params.from, update, { new : true } );

            return res.send(
                success( getDataBy( updateUser, "contacts" ) )
            );

        } catch ( e ) {
            return res.status( 401 ).send( failure( {
                message : e.message
            } ) );
        }
    },
    update_avatar : async ( userId, path ) => {
        return result = await User.findByIdAndUpdate( userId, {
            $set : { "avatar" : path }
        }, { new : true } );
    }
};