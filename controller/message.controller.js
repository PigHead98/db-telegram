const Message = require( '../models/message.model' );
const {success,failure} = require( '../helpers/response.helper' );

module.exports = {
    getMessages : async ( req, res ) => {
        try {
            const dataMessage = await Message.find( {
                "messageStatus" : process.env.STATUS_ACTIVE
            } );

            return res.json( success( dataMessage ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    },
    postCreateMessage : async ( req, res ) => {
        try {
            const result = await Message.create( req.body );

            return res.json( success( result ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    },
    postDelMessage : async ( req, res ) => {
        try {
            const result = await Message.updateOne( { _id : req.params.messageId }, { $set : {
                    "messageStatus" : process.env.STATUS_INACTIVE
                } } );

            return res.json( success( result ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    },
    postUpdateMessage : async ( req, res ) => {
        try {
            const result = await Message.updateOne( { _id : req.params.messageId }, { $set : req.body } );

            return res.json( success( result ) );
        } catch ( e ) {
            return res.json( failure( e.message ) );
        }
    }
};