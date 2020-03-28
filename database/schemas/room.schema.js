const mongoose = require( 'mongoose' );
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

module.exports = roomSchema;