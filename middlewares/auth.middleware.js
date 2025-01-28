const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("../constants/http.js");
const AppErrorCode = require("../constants/errors.js");
const { errorAssert, ServerError } = require("../utils/error.js");

const AdminAuth = async (req, res, next) => {
  const headerValue = req.header("Authorization");

  errorAssert(
    headerValue,
    STATUS_CODES.BAD_REQUEST,
    "Token not found!",
    AppErrorCode.InvalidAccessToken
  );

  errorAssert(
    headerValue.startsWith("Bearer"),
    STATUS_CODES.BAD_REQUEST,
    "Token must be a bearer token!"
  );

  const token = headerValue.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new ServerError(
          STATUS_CODES.UNAUTHORIZED,
          "Token Expired",
          AppErrorCode.ExpiredAccessToken
        );
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new ServerError(
          STATUS_CODES.UNAUTHORIZED,
          "Invalid Token",
          AppErrorCode.InvalidAccessToken
        );
      }
      throw new ServerError(STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    req.jwt = decoded;
    next();
  });
};

module.exports = {
  AdminAuth,
};
