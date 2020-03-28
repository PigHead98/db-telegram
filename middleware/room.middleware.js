const { checkSchema } = require( 'express-validator' );
const { isMongoId } = require( 'validator' );
const User = require( '../models/user.model' );
const { failure } = require( '../helpers/response.helper' );

module.exports = {
    validCreateRoom : ( req, res, next ) => {
        const { name, users } = req.body;
        let error = {};

        !name && Object.assign( error, { name : `name room is required` } );
        
        !users && Object.assign( error, { users : `users room is required` } );
        
        users && !Array.isArray( users ) && Object.assign( error, { users : `users room is array` } );

        if ( Object.keys( error ).length > 0 ) {
            return res.status( 401 ).json(
                failure( error, `data_wrong` )
            );
        }

        // check if array user have values that are not type mongo id
        let check = users.every( item => isMongoId( item ) );

        // remove id user that exists in array
        let removeUserExists = [ ...new Set( users ) ];

        if ( !check || removeUserExists.length !== users.length ) {
            return res.status( 401 ).json(
                failure( { users : `users wrong format` }, `data_wrong` )
            );
        }

        next();
    },
    validCreateRoom2Users : async ( req, res, next ) => {
        const { from, to } = req.body;

        // check if array user have values that are not type mongo id
        let check = [ from, to ].every( item => isMongoId( item ) );

        if ( !check || from === to ) {
            return res.status( 401 ).json(
                failure( { users : `users id wrong format` }, `data_wrong` )
            );
        }

        // only create room with true user id
        const checkIdUserExists = await User.find( {
            _id : {
                $in : [ from, to ]
            }
        } );

        if ( checkIdUserExists.length !== [ from, to ].length ) {
            return res.status( 401 ).json(
                failure( { users : `users id not exists in db` }, `data_wrong` )
            );
        }
        next();
    }
};