const express = require( 'express' );
const router = express.Router();

const LoginController = require( '../controller/login.controller' );
const MessageController = require( '../controller/message.controller' );
const AuthController = require( "../controller/auth.controller" );

const AuthMiddleWare = require( "../middleware/AuthMiddleware" );
const UserMiddleWare = require( "../middleware/UserMiddleware" );
const RateLimitMiddleware = require( "../middleware/RateLimitMiddleware" );

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
