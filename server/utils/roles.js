
const verifyRole = (roles) => (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('No user found');
    }
  
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send('Access Denied: Insufficient Permissions');
    }
  };
  
  module.exports = verifyRole;
  