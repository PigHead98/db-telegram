const jwt = require( "jsonwebtoken" );

let generateToken = ( user, secretSignature, tokenLife ) => {
    return new Promise( ( resolve, reject ) => {
        const userData = {
            _id : user._id,
            name : user.name,
            email : user.email,
            avatar : user.avatar || null,
            contacts : user.contacts || [],
        };
        // Thực hiện ký và tạo token
        jwt.sign(
            { data : userData },
            secretSignature,
            {
                algorithm : "HS256",
                expiresIn : tokenLife,
            },
            ( error, token ) => {
                if ( error ) {
                    return reject( error );
                }
                resolve( token );
            } );
    } );
};

let verifyToken = ( token, secretKey ) => {
    return new Promise( ( resolve, reject ) => {
        jwt.verify( token, secretKey, ( error, decoded ) => {
            if ( error ) {
                return reject( error );
            }
            resolve( decoded );
        } );
    } );
};
module.exports = {
    generateToken : generateToken,
    verifyToken : verifyToken,
};