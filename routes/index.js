const express = require('express');
const cors = require('cors');

const router = express.Router();
const bookController = require("../controller/book.controller");
const AuthMiddleWare = require("../middleware/AuthMiddleware");

/* GET home page. */
router.get('/', (req,res,next) => {
    res.render('index', { title: "name" });
});
router.get('/book',AuthMiddleWare.isAuth, bookController.index);

module.exports = router;
