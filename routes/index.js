const express = require('express');
const cors = require('cors');

const router = express.Router();
const bookController = require("../controller/book.controller");
/* GET home page. */
router.get('/', (req,res,next) => {
    res.render('index', { title: "name" });
});
router.get('/book',cors(), bookController.index);

module.exports = router;
