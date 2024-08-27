// Middleware to authorize specific roles
exports.authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied: You do not have the required role." });
    }
    next();
  };
};
