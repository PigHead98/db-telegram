const Room = require( '../models/room.model' );
const { failure, success } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );

module.exports = {
    getRooms : async ( req, res ) => {
        try {
            const dataRoom = await Room.find( {
                "state.available" : process.env.STATUS_ACTIVE
            } );

            return res.json( success( dataRoom ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    },
    postCreateRoom : async ( req, res ) => {
        try {
            const result = await Room.create( req.body );

            return res.json( success( result ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    },
    postDelRoom : async ( req, res ) => {
        try {
            const result = await Room.updateOne( { _id : req.params.roomId }, {
                $set : {
                    "state.available" : process.env.STATUS_INACTIVE
                }
            } );

            return res.json( success( result ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    },
    postUpdateRoom : async ( req, res ) => {
        try {
            const result = await Room.updateOne( { _id : req.params.roomId }, { $set : req.body } );

            return res.json( success( result ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    },
    findOrCreateChatRoom : async ( req, res ) => {
        try {
            const { from, to } = req.body;
            // this api to do 2 find or create room for only 2 user (normal mess)
            // only rooms for 2 users named idUser1 + idUser2
            let getRoomUser = await Room.findOne( {
                $or : [
                    { name : from + to },+
                    { name : to + from }
                ]

            } );

            if ( !getRoomUser ) {
                getRoomUser = await Room.create( { name : from + to, users : [ from, to ] } );
            }

            return res.json(
                success( getDataBy( getRoomUser, "_id", "users" ) )
            );
        } catch ( e ) {
            return res.status( 401 ).json( failure( {
                message : e.message
            } ) );
        }
    },
};