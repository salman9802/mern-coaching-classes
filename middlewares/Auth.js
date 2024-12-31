const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const headerValue = req.header("Authorization");
  let error = undefined;

  if (!headerValue) {
    error = new Error("Token not found!");
    error.status = 400;
  } else {
    if (!headerValue.startsWith("Bearer")) {
      error = new Error("Token should be a bearer token");
      error.status = 400;
    } else {
      const token = headerValue.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.jwt = decoded;
      } catch (error) {
        error = new Error("Invalid Token");
        error.status = 400;
      }
    }
    next(error);
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
