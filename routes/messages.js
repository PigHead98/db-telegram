const express = require( 'express' );
const router = express.Router();

const LoginController = require( '../controller/login.controller' );
const MessageController = require( '../controller/message.controller' );
const AuthController = require( "../controller/auth.controller" );

const AuthMiddleWare = require( "../middleware/auth.middleware" );
const UserMiddleWare = require( "../middleware/user.middleware" );
const RateLimitMiddleware = require( "../middleware/rateLimit.middleware" );

/* GET users listing. */
router.get( '/', MessageController.getMessages );

router.post( '/create',
    MessageController.postCreateMessage
);

router.post( '/update/:MessageId',
    MessageController.postUpdateMessage
);
router.post( '/del/:MessageId',
    MessageController.postDelMessage
);

module.exports = router;
