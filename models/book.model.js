const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    title: String,
    description: String,
    view: Number
});

let Book = mongoose.model('book',bookSchema, 'books');

module.exports = Book;