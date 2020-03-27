const mongoose = require( 'mongoose' );
const findOrCreate = require( 'mongoose-findorcreate' );
const roomSchema = new mongoose.Schema( {
    name : {
        type : String,
        trim : true,
        lowercase : true,
        index : true
    },
    topic : String,
    avatar : String,
    state : {
        online : {
            type : Boolean,
            default : false
        },
        available : {
            type : Boolean,
            default : true
        }
    },
    messages : Array,
    users : {
        type : Array,
        required : true
    },
    typeRoom : {
        type : Number,
        default : process.env.TYPE_ROOM_2_USERS // room 2 users is 0, multi user are 1
    },
    createdAt : Number,
    updatedAt : Number
}, {
    timestamps : { currentTime : () => Math.floor( Date.now() ) }
} );

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
module.exports = roomSchema;