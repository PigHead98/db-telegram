const express = require( 'express' );

const router = express.Router();

const { postCheckLogin, postLogout } = require( '../controller/login.controller' );
const { index, search_contact, register, update_contact, update } = require( '../controller/user.controller' );
const { refreshToken } = require( '../controller/auth.controller' );

const { isAuth } = require( "../middleware/auth.middleware" ); // check jwt token
const { validLogin, validLogout, validRegister, validUpdate } = require( "../middleware/user.middleware" ); // valid data from client
const { createAccountLimiter } = require( "../middleware/rateLimit.middleware" ); // limit request

/* GET users listing. */
router.get( '/:userId?', index );

router.get( '/search_contact/:value',
    search_contact
);

router.post( '/contact/:update/:from-:to',
    update_contact
);


router.post( '/register',
    createAccountLimiter,
    validRegister,
    register
);

router.post( '/update/:userId',
    isAuth,
    validUpdate,
    update
);

router.post( '/login',
    // RateLimitMiddleware.loginAccountLimiter,
    validLogin,
    postCheckLogin
);

router.get( '/logout/:userId',
    validLogout,
    postLogout
);

router.post( '/refresh-token',
    refreshToken
);

module.exports = router;
