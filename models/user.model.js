const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
    name : String,
    phone : String,
    email : String,
    password : String,
    image : String,
    apiVer : String,
    createdAt: Number,
    updatedAt: Number
},{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
} );

const User = mongoose.model( 'user', userSchema, 'tele_users' );

module.exports = User;