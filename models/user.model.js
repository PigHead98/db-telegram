const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
    name : {
        type : String,
        trim : true,
        required : true
    },
    phone : {
        type : String,
        trim : true,
        unique : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    image : String,
    apiVer : String,
    jwtToken : JSON,
    createdAt : Number,
    updatedAt : Number
}, {
    timestamps : { currentTime : () => Math.floor( Date.now() ) }
} );

const User = mongoose.model( 'user', userSchema, 'tele_users' );

module.exports = User;