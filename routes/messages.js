const express = require( 'express' );
const router = express.Router();

const { getMessages, postCreateMessage, postUpdateMessage, postDelMessage } = require( '../controller/message.controller' );


/* GET users listing. */
router.get( '/', getMessages );

router.post( '/create',
    postCreateMessage
);

router.post( '/update/:MessageId',
    postUpdateMessage
);
router.post( '/del/:MessageId',
    postDelMessage
);

module.exports = router;
