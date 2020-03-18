const mongoose = require( 'mongoose' );

const roomSchema = new mongoose.Schema( {
    name : {
        type : String,
        trim : true,
        lowercase : true,
        required : true
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
    createdAt : Number,
    updatedAt : Number
}, {
    timestamps : { currentTime : () => Math.floor( Date.now() ) }
} );

const Room = mongoose.model( 'room', roomSchema, 'tele_rooms' );

module.exports = Room;