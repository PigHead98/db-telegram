const mongoose = require( 'mongoose' );
const messageSchema = require('../database/schemas/MessageSchema');

const Message = mongoose.model( 'message', messageSchema, 'tele_messages' );

module.exports = Message;