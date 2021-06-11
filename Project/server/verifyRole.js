const jwt = require('jsonwebtoken');
const ROLES = require('./Models/Roles');
const replaceId = require('./utils').replaceId;
const User = require('./Models/User');

module.exports = 
    function verifyRoleOrSelf(role, allowIfSelf) {
        return function (req, res, next) { //here there is no req and res
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