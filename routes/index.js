const express = require( 'express' );

const router = express.Router();

/* GET home page. */
router.get( '/', ( req, res ) => {
    res.render( 'index', {
        owner : "Dao Truong An",
        urlSource : "https://github.com/PigHead98/db-telegram",
        progress : "75"
    } );
} );

module.exports = router;
