const express = require('express');
const cors = require('cors');

const router = express.Router();
const {apiLimiter} = require("../middleware/rateLimit.middleware");

/* GET home page. */
router.get('/', apiLimiter, (req, res, next) => {
  res.render('index', {
    owner: "Dao Truong An",
    urlSource: "https://github.com/PigHead98/db-telegram",
    progress: "50"
  });
});

module.exports = router;
