const mongoose = require( 'mongoose' );
const userSchema = require('../database/schemas/UserSchema');

const User = mongoose.model( 'user', userSchema, 'tele_users' );

module.exports = User;