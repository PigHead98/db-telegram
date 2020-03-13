const mongoose = require( 'mongoose' );

const conversationSchema = new mongoose.Schema( {
    fromId : String,
    toId : String,
    content : String,
    timestamps : true,
    type : String
} );

let Conversation = mongoose.model( 'telegram_conversation', conversationSchema, 'telegram_conversations' );

module.exports = Conversation;