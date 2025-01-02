const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const headerValue = req.header("Authorization");
  let err = undefined;

  try {
    if (!headerValue) {
      err = new Error("Token not found!");
      err.status = 400;
      throw err;
    }
    if (!headerValue.startsWith("Bearer")) {
      err = new Error("Invalid Token");
      err.status = 400;
      throw err;
    }

    const token = headerValue.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          err = new Error("Token Expired");
          err.status = 400;
        } else if (err instanceof jwt.JsonWebTokenError) {
          err = new Error("Invalid Token");
          err.status = 400;
        }
        throw err;
      }
      req.jwt = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  jwtAuth,
};
