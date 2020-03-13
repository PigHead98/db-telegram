const express = require('express');
const cors = require('cors');

const router = express.Router();
const AuthMiddleWare = require("../middleware/AuthMiddleware");

/* GET home page. */
router.get('/', (req,res,next) => {
    res.render('index', { title: "name" });
});

module.exports = router;
