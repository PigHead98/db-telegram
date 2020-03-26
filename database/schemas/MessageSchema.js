const mongoose = require( 'mongoose' );

const messageSchema = new mongoose.Schema( {
    idRoom : String,
    idUser : String,
    messageBody : String,
    messageStatus : {
        type : Boolean,
        default : true
    },
    messagesStyle : {
        type : Number,
        default : process.env.MESSAGE_STYLE_TEXT
    },
    createdAt : Number,
    updatedAt : Number
}, {
    timestamps : { currentTime : () => Math.floor( Date.now() ) }
} );

module.exports = messageSchema;