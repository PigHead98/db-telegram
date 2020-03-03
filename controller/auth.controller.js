const jwtHelper = require( "../helpers/jwt.helper" );

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-trungquandev.com-green-cat-a@";

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-trungquandev.com-green-cat-a@";


let createToken = async ( data ) => {
    try {
        const accessToken = await jwtHelper.generateToken( data, accessTokenSecret, accessTokenLife );

        const refreshToken = await jwtHelper.generateToken( data, refreshTokenSecret, refreshTokenLife );

        tokenList[refreshToken] = { accessToken, refreshToken };

        return { data, accessToken, refreshToken };
    } catch ( error ) {
        return { error };
    }
};

let refreshToken = async ( refreshTokenFromClient ) => {

    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
            const decoded = await jwtHelper.verifyToken( refreshTokenFromClient, refreshTokenSecret );

            const userFakeData = decoded.data;
            const accessToken = await jwtHelper.generateToken( userFakeData, accessTokenSecret, accessTokenLife );
            // gửi token mới về cho người dùng
            return { accessToken };
        } catch ( error ) {

            return {
                message : 'Invalid refresh token.',
            };
        }
    } else {
        return {
            message : 'No token provided.',
        };
    }
};
module.exports = {
    createToken : createToken,
    refreshToken : refreshToken
};
