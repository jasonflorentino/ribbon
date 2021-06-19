const jwt = require("jsonwebtoken");
const utils = require("../utils");
const { makeError: error } = require("./errorHandler");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = authenticate;

function authenticate(req, _res, next) {
  if (!req.headers.authorization) {
    throw error(403, "Not authorized: Authorization header required.")
  }

  const token = utils.getToken(req);
  
  if (!token) throw error(403, "Not authorized: No token.");

  else {
    try {
      req.decode = jwt.verify(token, JWT_SECRET)
      next();
    } catch (err) {
      console.log("Error in the following req! JWT Verify:", err.message);
      throw error(403, "Not authorized: Invalid token.")
    }
  }
}