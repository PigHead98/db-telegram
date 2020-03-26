const mongoose = require( 'mongoose' );
const findOrCreate = require('mongoose-findorcreate');
const roomSchema = new mongoose.Schema( {
    name : {
        type : String,
        trim : true,
        lowercase : true
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

roomSchema.plugin(findOrCreate);
module.exports = roomSchema;