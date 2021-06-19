const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const List = require("../models/list");
const Person = require("../models/person");
const { makeError: error } = require("../_helpers/errorHandler");

const router = express.Router();
const secret = process.env.JWT_SECRET;

// Route
router.post("/", signup);

// Controller
function signup(req, res, next) {
  signupService(req.body)
    .then(result => res.status(201).json(result))
    .catch(err => next(err));
}

// Service
async function signupService(body) {
  const { email, password } = body;
  
  if (!email || !password) {
    throw "An email and password must be provided";
  }

  return User
    .where({ email: email })
    .fetch()
    .then(() => {
      throw error(409, "An account with this email already exists");
    })
    .catch((err) => {
      if (err.status) throw err;

      const uuid = uuidv4();
      const hash = CryptoJS.SHA1(password + uuid);
      const hashedPass = hash.toString(CryptoJS.enc.Base64);

      new User({
        email: email,
        password: hashedPass,
        uuid: uuid
      })
      .save()
      .then(newUser => {
        new List({ user_id: newUser.id }).save()
        new Person({ user_id: newUser.id }).save()

        const data = {
          email: newUser.attributes.email,
          user: newUser.attributes.uuid
        }
        const token = jwt.sign({user: data}, secret, {expiresIn: '12h'});
        return { token: token };
      })
    });
}

module.exports = router;