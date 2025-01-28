const { z } = require("zod");
const { STATUS_CODES } = require("../constants/http.js");
const { ServerError } = require("../utils/error.js");

const errorMiddleware = (err, req, res, next) => {
  const stack =
    process.env.NODE_ENV !== "production"
      ? err.stack.replace(/(\r\n|\n|\r|\s{2,})+/gm, ":::").split(":::")
      : null; // replace any form of line break (or more than one space) to make an array for better readability from stack

  // handle server error
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      message: err.message,
      err_code: err.errorCode,
      stack,
    });
  }

  // handle zod error
  if (err instanceof z.ZodError) {
    const issues = err.issues.map((issue) => ({
      path: issue.path.join(","),
      message: issue.message,
    }));

    // console.log(err.message);
    // console.log(typeof err.message);

    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: issues.map((i) => ({ [i.path]: i.message })),
      issues,
      stack,
    });
  }

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    msg: "Internal Server Error",
    stack,
  });
};

module.exports = {
  errorMiddleware,
};
