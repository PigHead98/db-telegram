const User = require( '../models/user.model' );
const { success, failure } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );
const auth = require( "./auth.controller" );
const md5 = require( 'md5' );

module.exports = {
    index : async ( req, res, next ) => {
        try {
            const dataUsers = await User.find();
            return res.json( success( dataUsers ) );
        } catch ( e ) {
            next( e )
        }
    },
    getUserByToken : ( req, res ) => {
        return res.json( success( req.jwtDecoded ) );
    },
    register : async ( req, res ) => {
        // all data was checked by middleware so here only to save at db
        try {
            const data = req.body;

            data.password = md5( data.password );
            data.jwtToken = await auth.createToken( data ); // create token jwt to check auth user

            // when have error at create token
            if ( data.jwtToken.error ) {
                // next(renderToken.error);
                return res.status( 401 ).json(
                    failure( data.jwtToken.error.message, `createToken_fails` )
                );
            }

            const result = await User.create( data );

            return res.json( success( getDataBy( result, "contacts", "_id", "name", "email", "jwtToken", ) ) );
        } catch ( error ) {
            return res.status( 401 ).json(
                failure( error.message, `register_fails` ) );
        }
    },
    update : async ( req, res ) => {
        try {
            const result = await User.updateOne( { _id : req.params.userId }, { $set : req.body } );

            return res.json(
                success( result )
            );
        } catch ( e ) {
            return res.status( 401 ).json( failure( {
                message : e.message
            } ) );
        }
    },
    search_contact : async ( req, res ) => {
        try {
            // this api to response contact when client search ( by email or phone )
            const result = await User.findOne( {
                $or : [
                    {
                        email : req.params.value
                    },
                    {
                        phone : req.params.value
                    }
                ]
            }, 'name email avatar' );

            return res.json(
                success( result )
            );

        } catch ( e ) {
            return res.status( 401 ).json( failure( {
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
                    return res.status( 401 ).json( failure( `This route only use for remove or add`, 'route_fails' ) );
            }
            const updateUser = await User.findByIdAndUpdate( req.params.from, update, { new : true } );

            return res.json(
                success( getDataBy( updateUser, "contacts" ) )
            );

        } catch ( e ) {
            return res.status( 401 ).json( failure( {
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
