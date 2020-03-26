const express = require( 'express' );

const router = express.Router();

const LoginController = require( '../controller/login.controller' );
const UserController = require( '../controller/user.controller' );
const AuthController = require( "../controller/auth.controller" );

const AuthMiddleWare = require( "../middleware/auth.middleware" ); // check jwt token
const UserMiddleWare = require( "../middleware/user.middleware" ); // valid data from client
const RateLimitMiddleware = require( "../middleware/rateLimit.middleware" ); // limit request

/* GET users listing. */
router.get( '/:userId?', UserController.index );

router.get( '/search_contact/:value',
    UserController.search_contact
);

router.post( '/contact/:update/:from-:to',
    UserController.update_contact
);


router.post( '/register',
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
    // RateLimitMiddleware.loginAccountLimiter,
    UserMiddleWare.validLogin,
    LoginController.postCheckLogin
);

router.get( '/logout/:userId',
    UserMiddleWare.validLogout,
    LoginController.postLogout
);

router.post( '/refresh-token',
    LoginController.refreshToken
);

module.exports = router;
