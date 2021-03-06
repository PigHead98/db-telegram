const jwtHelper = require( "../helpers/jwt.helper" );
const User = require( '../models/user.model' );

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example";

let createToken = async ( data ) => {
    try {
        //generate token
        const accessToken = await jwtHelper.generateToken( data, accessTokenSecret, accessTokenLife );
        const refreshToken = await jwtHelper.generateToken( data, refreshTokenSecret, refreshTokenLife );

        return { accessToken, refreshToken };
    } catch ( error ) {
        return { error };
    }
};

let refreshToken = async ( refreshTokenFromClient ) => {
    //find user by token to check exists in db
    let checkExists = await User.findOne( {
        "jwtToken.refreshToken" : refreshTokenFromClient
    } );

    if ( refreshTokenFromClient && checkExists ) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
            const decoded = await jwtHelper.verifyToken( refreshTokenFromClient, refreshTokenSecret );

            const userData = decoded.data;
            const accessToken = await jwtHelper.generateToken( userData, accessTokenSecret, accessTokenLife );

            // update db và gửi token mới về cho người dùng
            await User.findOneAndUpdate( {
                "jwtToken.refreshToken" : refreshTokenFromClient
            }, {
                "jwtToken.accessToken" : accessToken
            } );

            return { accessToken };
        } catch ( error ) {
            return {
                error : error.message,
            };
        }
    } else {
        return {
            error : 'refresh token fails',
        };
    }
};
module.exports = {
    createToken : createToken,
    refreshToken : refreshToken
};
