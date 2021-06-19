module.exports = {
  errorHandler,
  makeError
}

function errorHandler(err, _req, res, _next) {
  if (typeof (err) === "string") {
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const status = err.status || 500;
  return res.status(status).json({ message: err.message });
}

/**
 * Creates a new error object with custom status, message, and name.
 * @param {Number} status 
 * @param {String} message 
 * @param {String} name 
 * @returns new Error object
 */
function makeError(status, message, name = "ServerError") {
  const e = new Error(message)
  e.name = name;
  e.status = status;
  return e;
}