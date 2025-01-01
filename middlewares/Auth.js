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

const jwtToken = (payload) => {
  const isValidString = typeof payload === "string" && payload.trim() !== "";
  const isValidBuffer = Buffer.isBuffer(payload) && payload.length > 0;
  const isValidObject =
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    Object.keys(payload).length > 0;
  if (isValidString || isValidBuffer || isValidObject) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    });
    return token;
  } else {
    return null;
    // throw new Error(`Invalid payload. Cannot be of type${typeof payload}`);
  }
};

module.exports = {
  jwtAuth,
  jwtToken,
};
