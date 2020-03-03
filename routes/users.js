const express = require( 'express' );
const router = express.Router();

const login = require( '../controller/login.controller' );
const AuthController = require("../controller/auth.controller");
const AuthMiddleWare = require("../middleware/AuthMiddleware");

/* GET users listing. */
router.get( '/', function ( req, res, next ) {
    res.send( 'respond with a resource' );
} );

router.post( '/login', login.postCheckLogin );
router.post('/refresh-token', login.refreshToken);

module.exports = router;
