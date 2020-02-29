const book = require("../models/book.model");

module.exports = {
  index: async (req,res,next) => {
      let getBook = await book.find();
      return res.send(getBook);
  },
};