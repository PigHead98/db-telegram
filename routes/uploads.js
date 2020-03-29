const express = require( 'express' );

const router = express.Router();

const { imageUpload } = require( "../middleware/upImage.middleware" );

router.post( '/image/avatar/:userId',
    imageUpload
);

module.exports = router;
