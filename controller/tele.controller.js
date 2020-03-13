const tele = require("../models/tele.model");

module.exports = {
    index: async (req,res,next) => {
        let getData = await tele.find();
        return res.send(getData);
    },
};