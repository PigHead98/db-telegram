const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
    name : {
        type : String,
        trim : true,
        lowercase : true,
        required : true
    },
    phone : {
        type : String,
        require : true,
        index : true,
        unique : true,
        sparse : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    avatar : {
        type : String,
        default : null
    },
    apiVer : String,
    jwtToken : JSON,
    state : {
        online : {
            type : Boolean,
            default : true
        },
        available : {
            type : Boolean,
            default : true
        }
    },
    contacts : Array,
    createdAt : Number,
    updatedAt : Number
}, {
    timestamps : { currentTime : () => Math.floor( Date.now() ) }
} );

const User = mongoose.model( 'user', userSchema, 'tele_users' );

module.exports = User;