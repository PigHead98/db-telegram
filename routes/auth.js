const express = require('express');

const router = express.Router();
const AuthController = require("../controller/auth.controller");
const AuthMiddleWare = require("../middleware/AuthMiddleware");
/* GET home page. */
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
// List Protect APIs:


module.exports = router;
