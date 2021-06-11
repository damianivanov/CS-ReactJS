const jwt = require("jsonwebtoken");
const ROLES = require("./Models/Roles");

module.exports = {
  isAdmin: (req, res, next) => {
    const token = req.header("auth-token");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      if (verified.role === ROLES.ROLES.ADMIN) {
        next();
      } else {
        res.status(401).send("Admin Only");
      }
    } catch (error) {
      res.status(400).send("Invalid Token");
    }
  },
  canEdit: (req, res, next) => {
    const token = req.header("auth-token");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      const { userId } = req.params;
      if (verified.role === ROLES.ROLES.ADMIN) {
        next();
      } else if (verified.userId === userId) {
        next(); //sameUser
      } else {
        res.status(401).send("Admin Only");
      }
    }catch (error) {
      res.status(400).send("Invalid Token");
    }
  },
  isSameUser: (req) => {
    const { userId } = req.params;
    const token = req.header("auth-token");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      return verified.userId === userId; //
    } catch (error) {
      return false;
    }
  },
  checkAdmin:(req)=>{
    const token = req.header("auth-token");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      if (verified.role === ROLES.ROLES.ADMIN) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

};
