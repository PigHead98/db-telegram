const Message = require( '../models/message.model' );
const Response = require( '../helpers/response.helper' );

module.exports = {
    getMessages : async ( req, res, next ) => {
        try {
            const dataMessage = await Message.find( {
                "messageStatus" : process.env.STATUS_ACTIVE
            } );

            return res.json( Response.success( dataMessage ) );
        } catch ( e ) {
            return res.json( Response.failure( e.message ) );
        }
    },
    postCreateMessage : async ( req, res ) => {
        try {
            let result = await Message.create( req.body );

            return res.json( Response.success( result ) );
        } catch ( e ) {
            return res.json( Response.failure( e.message ) );
        }
    },
    postDelMessage : async ( req, res ) => {
        try {
            let result = await Message.updateOne( { _id : req.params.messageId }, { $set : {
                    "messageStatus" : process.env.STATUS_INACTIVE
                } } );

            return res.json( Response.success( result ) );
        } catch ( e ) {
            return res.json( Response.failure( e.message ) );
        }
    },
    postUpdateMessage : async ( req, res ) => {
        try {
            const data = req.body;
            let result = await Message.updateOne( { _id : req.params.messageId }, { $set : data } );

            return res.json( Response.success( result ) );
        } catch ( e ) {
            return res.json( Response.failure( e.message ) );
        }
    }
};