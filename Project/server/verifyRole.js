const User = require('./Models/User');
const jwt = require('jsonwebtoken');
const ROLES = require('./Models/Roles');

module.exports = {
    isAdmin: (req, res, next) =>{
        const token = req.header('auth-token');
        try {
            const verified = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
            if(verified.role === ROLES.ROLES.ADMIN){
                next();
            }else{
                res.status(401).send('Admin Only')
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    },
    isManager: (req, res, next) =>{
        const token = req.header('auth-token');
        try {
            const verified = jwt.verify(token,process.env.JWT_SECRET_TOKEN);
            if(verified.role === ROLES.ROLES.MANAGER){
                next();
            }else{
                res.status(401).send('Manager Only')
            }
        } catch (error) {
            res.status(400).send('Invalid Token')
        }
    }
}