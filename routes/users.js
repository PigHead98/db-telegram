const express = require( 'express' );
const cors = require( 'cors' );
const router = express.Router();

const login = require( '../controller/login.controller' );

/* GET users listing. */
router.get( '/', function ( req, res, next ) {
    res.send( 'respond with a resource' );
} );

router.post( '/login', cors(), login.postCheckLogin );

module.exports = router;
