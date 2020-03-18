const express = require( 'express' );
const router = express.Router();

const LoginController = require( '../controller/login.controller' );
const RoomController = require( '../controller/room.controller' );
const AuthController = require( "../controller/auth.controller" );

const AuthMiddleWare = require( "../middleware/AuthMiddleware" );
const UserMiddleWare = require( "../middleware/UserMiddleware" );
const RateLimitMiddleware = require( "../middleware/RateLimitMiddleware" );

/* GET users listing. */
router.get( '/', RoomController.getRooms );

router.post( '/create',
    RoomController.postCreateRoom
);

router.post( '/update/:roomId',
    RoomController.postUpdateRoom
);
router.post( '/del/:roomId',
    RoomController.postDelRoom
);

module.exports = router;
