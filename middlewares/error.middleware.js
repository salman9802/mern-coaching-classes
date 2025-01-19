const { STATUS_CODES } = require("../constants/http.js");
const { ServerError } = require("../utils/error.js");

const errorMiddleware = (err, req, res, next) => {
  const stack =
    process.env.NODE_ENV !== "production"
      ? err.stack.replace(/(\r\n|\n|\r|\s{2,})+/gm, ":::").split(":::")
      : null; // replace any form of line break (or more than one space) to make an array for better readability from stack

  if (err instanceof ServerError) {
    res.status(err.statusCode).json({
      message: err.message,
      stack,
    });
    return;
  }

  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    msg: "Internal Server Error",
    stack,
  });
};

module.exports = {
  errorMiddleware,
};
