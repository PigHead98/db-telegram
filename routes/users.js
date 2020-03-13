const express = require( 'express' );
const router = express.Router();

const login = require( '../controller/login.controller' );
const user = require( '../controller/user.controller' );
const AuthController = require( "../controller/auth.controller" );
const AuthMiddleWare = require( "../middleware/AuthMiddleware" );
const UserMiddleWare = require( "../middleware/UserMiddleware" );

/* GET users listing. */
router.get( '/', user.index );
router.post( '/register', UserMiddleWare.validRegister, user.register );
router.post( '/update', user.update );
router.post( '/login', UserMiddleWare.validLogin, login.postCheckLogin );
router.post( '/refresh-token', login.refreshToken );

module.exports = router;
