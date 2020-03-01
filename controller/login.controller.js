const user = require( '../models/user.model' );

const md5 = require( 'md5' );
module.exports = {
    postCheckLogin : async ( req, res, next ) => {
        try {

            let result = await user.findOne( {
                email : req.body.email
            } );

            if ( !result ) {
                return res.send( {
                    error : {
                        email : "email is invalid"
                    },
                    data : req.body
                } );
            }

            if ( result.password !== md5( req.body.password ) ) {
                return res.send( {
                    error : {
                        password : "password is invalid"
                    },
                    data : req.body
                } );
            }

            return res.send( {
                result : result,
            } );
        } catch ( e ) {
            return res.send( {
                error : e
            } );
        }
    }
};