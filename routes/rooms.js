const express = require( 'express' );
const router = express.Router();

const LoginController = require( '../controller/login.controller' );
const UserController = require( '../controller/user.controller' );
const AuthController = require( "../controller/auth.controller" );

const AuthMiddleWare = require( "../middleware/AuthMiddleware" );
const UserMiddleWare = require( "../middleware/UserMiddleware" );
const RateLimitMiddleware = require( "../middleware/RateLimitMiddleware" );

/* GET users listing. */
router.get( '/', UserController.index );

router.post( '/create',
    RateLimitMiddleware.createAccountLimiter,
    UserMiddleWare.validRegister,
    UserController.register
);

router.post( '/update/:userId',
    AuthMiddleWare.isAuth,
    UserMiddleWare.validUpdate,
    UserController.update
);

router.post( '/login',
    UserMiddleWare.validLogin,
    LoginController.postCheckLogin
);

router.post( '/refresh-token',
    AuthMiddleWare.isAuth,
    LoginController.refreshToken
);

module.exports = router;
