const Room = require( '../models/room.model' );
const Response = require( '../helpers/response.helper' );

module.exports = {
    getRooms : async ( req, res, next ) => {
        try {
            const dataRoom = await Room.find( {
                "state.available" : process.env.STATUS_ACTIVE
            } );

            return res.send( Response.success( dataRoom ) );
        } catch ( e ) {
            return res.send( Response.failure( e.message ) );
        }
    },
    postCreateRoom : async ( req, res ) => {
        try {
            const data = req.body;
            let result = await Room.create( data );

            return res.send( Response.success( result ) );
        } catch ( e ) {
            return res.send( Response.failure( e.message ) );
        }
    },
    postDelRoom : async ( req, res ) => {
        try {
            let result = await Room.updateOne( { _id : req.params.roomId }, { $set : {
                "state.available" : process.env.STATUS_INACTIVE
            } } );

            return res.send( Response.success( result ) );
        } catch ( e ) {
            return res.send( Response.failure( e.message ) );
        }
    },
    postUpdateRoom : async ( req, res ) => {
        try {
            const data = req.body;
            let result = await Room.updateOne( { _id : req.params.roomId }, { $set : data } );

            return res.send( Response.success( result ) );
        } catch ( e ) {
            return res.send( Response.failure( e.message ) );
        }
    }
};