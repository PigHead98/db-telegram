const express = require( 'express' );

const router = express.Router();

const UploadsImageMiddleware = require( "../middleware/upImage.middleware" );

router.post( '/image/avatar/:userId',
    UploadsImageMiddleware.imageUpload
);

module.exports = router;
