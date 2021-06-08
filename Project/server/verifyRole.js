const jwt = require('jsonwebtoken');
const ROLES = require('./Models/Roles');
const User = require('./Models/User');

module.exports = {
    // isAdmin: (req, res, next) => {
    //     const token = req.header('auth-token');
    //     try {
    //         const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    //         if (verified.role === ROLES.ROLES.ADMIN) {
    //             next();
    //         } else {
    //             res.status(401).send('Admin Only')
    //         }
    //     } catch (error) {
    //         res.status(400).send('Invalid Token')
    //     }
    // },
    // isManager: (req, res, next) => {
    //     const token = req.header('auth-token');
    //     try {
    //         const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    //         if (verified.role === ROLES.ROLES.MANAGER) {
    //             next();
    //         } else {
    //             res.status(401).send('Manager Only')
    //         }
    //     } catch (error) {
    //         res.status(400).send('Invalid Token')
    //     }
    // },
    // isSameUser: (req) => {
    //     const { userId } = req.params;
    //     const token = req.header('auth-token');
    //     try {
    //         const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    //         return verified.userId === userId
    //     } catch (error) {
    //         return false;
    //     }
    // },
    
    verifyRoleOrSelf(role, allowIfSelf) {
        return function (req, res, next) {
          const paramUserId = allowIfSelf && req.params.userId;
          const userId = req.userId;
          if (!userId || (allowIfSelf && !paramUserId) ) next({ status: 403, message: `No userId provided.` }); //Error
          else {
            User.findOne({ _id: userId }, function (error, user) {
              if (error) next({ status: 500, message: `Server error.`, error }); //Error
              else if (!user) next({ status: 404, message: `User not found.` }); //Error
              else {
                  if (user.role < role && (!allowIfSelf || userId !== paramUserId) ) 
                    next({ status: 403, message: `Not enough privilegies.` }); //Error
                  else {
                      delete user.password;
                      replaceId(user);
                      req.user = user;
                      next();
                  }
              }
            });
          }
        }
    }
}