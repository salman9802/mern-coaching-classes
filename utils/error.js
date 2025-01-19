const assert = require("assert");

// Pass errors thrown in controller to error middleware
const asyncErrorHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

// Custom application error
class ServerError extends Error {
  constructor(statusCode, message, errorCode) {
    super(message || "Server Error");
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

// Asserts a condition and throws a ServerError if condition is falsy
const errorAssert = (condition, httpStatusCode, message, errorCode) =>
  assert(condition, new ServerError(httpStatusCode, message, errorCode));

module.exports = {
  asyncErrorHandler,
  ServerError,
  errorAssert,
};
