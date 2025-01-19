const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("../constants/http");

const AdminAuth = (req, res, next) => {
  const headerValue = req.header("Authorization");
  let err = undefined;

  try {
    if (!headerValue) {
      err = new Error("Token not found!");
      err.status = STATUS_CODES.BAD_REQUEST;
      throw err;
    }
    if (!headerValue.startsWith("Bearer")) {
      err = new Error("Invalid Token");
      err.status = STATUS_CODES.BAD_REQUEST;
      throw err;
    }

    const token = headerValue.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          err = new Error("Token Expired");
          err.status = STATUS_CODES.BAD_REQUEST;
        } else if (err instanceof jwt.JsonWebTokenError) {
          err = new Error("Invalid Token");
          err.status = STATUS_CODES.BAD_REQUEST;
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
  AdminAuth,
};
