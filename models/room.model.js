const mongoose = require( 'mongoose' );
const findOrCreate = require( 'mongoose-findorcreate' );
const roomSchema = require('../database/schemas/room.schema');

roomSchema.plugin( findOrCreate );

//add user to room with
/* {roomId} : id's room that need to add (type mongo id)
 * {arrUserId} : list user id ( type array )
 * Ex query :  await roomSchema.addUsersToRoom( '5e7d8a49f5fbba2a10e0050f', [ '5e7c5f633ecada30a00d8f1d' ] )
 * */
roomSchema.static( 'addUsersToRoom', function ( roomId, arrUserId ) {
    return this.findByIdAndUpdate( roomId, {
        $addToSet : {
            "users" : { $each : arrUserId }
        }
    }, { new : true } )
} );

const Room = mongoose.model( 'room', roomSchema, 'tele_rooms' );

module.exports = Room;