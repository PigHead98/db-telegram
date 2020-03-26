const express = require( 'express' );
const router = express.Router();

const LoginController = require( '../controller/login.controller' );
const { getRooms, postCreateRoom, postUpdateRoom, postDelRoom, findOrCreateChatRoom } = require( '../controller/room.controller' );
const AuthController = require( "../controller/auth.controller" );

const { isAuth } = require( "../middleware/AuthMiddleware" );
const { validCreateRoom } = require( "../middleware/RoomMiddleware" );
const RateLimitMiddleware = require( "../middleware/RateLimitMiddleware" );

/* GET users listing. */
router.get( '/', getRooms );

router.post( '/create',
    validCreateRoom,
    postCreateRoom
);

router.post( '/update/:roomId',
    postUpdateRoom
);
router.post( '/del/:roomId',
    postDelRoom
);

router.get( '/create-chat-rooms/:from-:to',
    validCreateRoom,
    findOrCreateChatRoom
);

module.exports = router;
