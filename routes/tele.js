const express = require('express');


const router = express.Router();
const teleController = require("../controller/tele.controller");
/* GET home page. */
router.get('/', (req,res,next) => {
    res.render('index', { title: "name" });
});
router.get('/data', teleController.index);


module.exports = router;
