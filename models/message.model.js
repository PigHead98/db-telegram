const mongoose = require( 'mongoose' );
const messageSchema = require('../database/schemas/message.schema');

const Message = mongoose.model( 'message', messageSchema, 'tele_messages' );

module.exports = Message;