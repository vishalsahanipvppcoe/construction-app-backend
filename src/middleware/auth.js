const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (roles = []) => {
  // allow passing single role as string
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload; // { id, role, email }
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
