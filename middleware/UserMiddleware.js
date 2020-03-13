const validator = require('validator');
const User = require( '../models/user.model' );

module.exports = {
    validRegister : async ( req, res, next ) => {
        let data = req.body;

        let checkExists = await User.findOne( { email : data.email } );

        if ( checkExists ) {
            return res.send( {
                status : "email already used",
                result : data
            } );
        }

        next();
    },
    validLogin : async ( req, res, next ) => {
        let result = await User.findOne( {
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

        next();
    }
};