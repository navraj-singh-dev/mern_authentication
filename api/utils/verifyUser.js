const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return next(errorHandler(401, "Token Not Found, You Need To Login!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid"));
    
    // "user" here looks like: { id: '656d7366bf908bff481d20e5', iat: 1702034444 }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};
