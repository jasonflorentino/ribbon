const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { makeError: error } = require("../_helpers/errorHandler");

const router = express.Router();
const secret = process.env.JWT_SECRET;

// Route
router.post("/", login);

// Controller
function login(req, res, next) {
  loginService(req.body)
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

// Service
async function loginService(body) {
  const { email, password } = body;
    
  if (!email || !password) {
    throw "An email and password must be provided";
  }

  return User
    .where({ email: email })
    .fetch()
    .then(user => {
      const matched = user.attributes;
      const hash = CryptoJS.SHA1(password + matched.uuid);
      const incomingPass = hash.toString(CryptoJS.enc.Base64);

      if (matched.password === incomingPass) {
        const data = { email: matched.email, user: matched.uuid };
        const token = jwt.sign(data, secret, {expiresIn: '12h'});
        return { token: token };
      }

      throw error(403, "The password provided is incorrect");
    })
    .catch((err) => {
      if (err.status) throw err;
      throw error(400, "Couldn't find a user with this email");
    });
}

module.exports = router;