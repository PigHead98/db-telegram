var express = require('express');
var router = express.Router();
const bookController = require("../controller/book.controller");
/* GET home page. */
router.get('/', (req,res,next) => {
    res.render('index', { title: "name" });
});
router.get('/book', bookController.index);

module.exports = router;
