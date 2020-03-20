const { update_avatar } = require( '../controller/user.controller' );
const { multer } = require( '../app_module/node_module.exports' );
const { success, failure } = require( '../helpers/response.helper' );
const { getDataBy } = require( '../helpers/getDataResponse.helper' );

const storage = multer.diskStorage( {
        destination : 'public/assets/img/avatar',
        filename : ( req, file, callback ) => {
            const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 1E9 );
            callback( null, uniqueSuffix + '-' + file.originalname );
        }
    } )
;

let fileFilter = function ( req, file, cb ) {
    var allowedMimes = [ 'image/jpeg', 'image/pjpeg', 'image/png' ];
    if ( allowedMimes.includes( file.mimetype ) ) {
        cb( null, true );
    } else {
        cb( {
            success : false,
            message : 'Invalid file type. Only jpg, png image files are allowed.'
        }, false );
    }
};

let obj = {
    storage : storage,
    limits : {
        fileSize : 2000 * 1024
    },
    fileFilter : fileFilter
};

const upload = multer( obj ).single( 'file' ); // upload.single('file')

module.exports.imageUpload = ( req, res, next ) => {
    upload( req, res, function ( error ) {
        if ( error ) {
            if ( error.code == 'LIMIT_FILE_SIZE' ) { //instanceof multer.MulterError
                error.message = 'File Size is too large. Allowed file size is 200KB';
            }

            return res.status( 500 ).send( failure( error.message, error.code ) );
        } else {
            if ( !req.file ) {
                res.status( 500 ).send( failure( 'file not found', '404' ) );
            }

            let pathFile = '../' + req.file.path.split( "\\" ).slice( 1 ).join( "/" );

            update_avatar( req.params.userId, pathFile )
                .then( onDone => {
                    return res.status( 200 ).send( success( onDone.avatar ) )
                } )
                .catch( error => {
                    return res.status( 500 ).send( failure( error.message ) );
                } );
        }

    } )
};