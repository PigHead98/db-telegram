const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
    name : String,
    phone : String,
    email : String,
    password : String,
    image : String
} );

const User = mongoose.model( 'user', userSchema, 'users' );

module.exports = User;