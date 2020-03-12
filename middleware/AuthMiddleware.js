const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example";

module.exports = {
    isAuth : async (req, res, next) => {
        const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
        if (tokenFromClient) {
            try {
                const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
                req.jwtDecoded = decoded;
                next();
            } catch (error) {
                return res.status(401).json({
                    message: error,
                });
            }
        } else {
            return res.status(403).send({
                message: 'No token provided.',
            });
        }
    }
};