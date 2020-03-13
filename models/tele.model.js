const mongoose = require( 'mongoose' );

const teleSchema = new mongoose.Schema( {
    name : String,
    email : String,
    avartar : String,
    password : String
} );

let Tele = mongoose.model( 'tele', teleSchema, 'telegram_users' );

module.exports = Tele;