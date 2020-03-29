const Room = require( '../models/room.model' );
const User = require( '../models/user.model' );
const Message = require( '../models/message.model' );
const Response = require( '../helpers/response.helper' );

module.exports = {
    detachMess : ( { type, content } ) => {
        switch ( type ) {
            case process.env.MESSAGE_STYLE_TEXT :
                break;
            case process.env.MESSAGE_STYLE_IMAGE :
                break;
            case process.env.MESSAGE_STYLE_FILE :
                break;
            default:
                break;
        }
    },
    saveMess : async ( messenger, roomId, userId ) => {
        return await Message.create( {
            idRoom : roomId,
            idUser : userId,
            messageBody : messenger
        } )
    },
};