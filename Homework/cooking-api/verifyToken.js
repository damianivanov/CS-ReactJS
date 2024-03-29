const jwt = require('jsonwebtoken');
const dotenvt = require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied')
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        next();
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}
