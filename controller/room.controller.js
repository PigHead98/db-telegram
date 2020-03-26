const Room = require( '../models/room.model' );
const { failure, success } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );

module.exports = {
    getRooms : async ( req, res, next ) => {
        try {
            const dataRoom = await Room.find( {
                "state.available" : process.env.STATUS_ACTIVE
            } );

            return res.send( success( dataRoom ) );
        } catch ( e ) {
            return res.send( failure( e.message ) );
        }
    },
    postCreateRoom : async ( req, res ) => {
        try {
            const data = req.body;
            console.log( data.users );
            let result = await Room.create( data );

            return res.send( success( result ) );
        } catch ( e ) {
            return res.send( failure( e.message ) );
        }
    },
    postDelRoom : async ( req, res ) => {
        try {
            let result = await Room.updateOne( { _id : req.params.roomId }, {
                $set : {
                    "state.available" : process.env.STATUS_INACTIVE
                }
            } );

            return res.send( success( result ) );
        } catch ( e ) {
            return res.send( failure( e.message ) );
        }
    },
    postUpdateRoom : async ( req, res ) => {
        try {
            const data = req.body;
            let result = await Room.updateOne( { _id : req.params.roomId }, { $set : data } );

            return res.send( success( result ) );
        } catch ( e ) {
            return res.send( failure( e.message ) );
        }
    },
    findOrCreateChatRoom : async ( req, res ) => {
        try {
            const { from, to } = req.body;
            // this api to do 2 get or create room for only 2 user (normal mess)

            // only rooms for 2 users named idUser1 + idUser2
            const getRoomUser = await Room.findOne( {
                $or : [
                    { name : from + to },
                    { name : to + from }
                ]

            } );

            if ( getRoomUser ) {
                return res.send(
                    success( getDataBy( getRoomUser, "_id", "users" ) )
                );
            }

            const createRoom = await Room.create( { name : from + to, users : [ from, to ] } );

            return res.send(
                success( getDataBy( createRoom, "_id", "users" ) )
            );
        } catch ( e ) {
            return res.status( 401 ).send( failure( {
                message : e.message
            } ) );
        }
    },
};