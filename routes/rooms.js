const express = require( 'express' );
const router = express.Router();

const LoginController = require( '../controller/login.controller' );
const { getRooms, postCreateRoom, postUpdateRoom, postDelRoom, findOrCreateChatRoom } = require( '../controller/room.controller' );
const AuthController = require( "../controller/auth.controller" );

const { isAuth } = require( "../middleware/auth.middleware" );
const { validCreateRoom, validCreateRoom2Users } = require( "../middleware/room.middleware" );
const RateLimitMiddleware = require( "../middleware/rateLimit.middleware" );

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

router.post( '/rooms-for-two-user',
    validCreateRoom2Users,
    findOrCreateChatRoom
);

module.exports = router;
