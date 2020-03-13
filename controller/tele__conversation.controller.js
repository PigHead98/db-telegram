const tele_conversation = require( "../models/tele_conversation.model" );
const tele = require( "../models/tele.model" );

module.exports = {

    getConversation : async ( req, res, next ) => {
        let getData = await tele_conversation.find();
        return res.send( getData );
    },

    postConversation : async ( req, res, next ) => {
        let getData = await tele_conversation.find();
        console.log(getData._id);
        let data = {
            fromId : String,
            toId : String,
            content : String,
            type : String
        };
    }
};