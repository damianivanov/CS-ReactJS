const jwt = require('jsonwebtoken');
const dotenvt = require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) next({ status: 403, message: `No access token provided.` });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.userId = verified.id;
        next();
    } catch (error) {
        next({ status: 403, message: `Failed to verify token.`, error });
    }
}
