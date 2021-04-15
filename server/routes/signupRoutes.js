/* ------------------------------------------------------------
 * ROUTES TO /signup
 * ------------------------------------------------------------ */

const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/user");
const List = require("../models/list");
const Person = require("../models/person");

const router = express.Router();
const secret = process.env.JWT_SECRET;

/* ------------------------------------------------------------
 * POST to create new user
 * ------------------------------------------------------------ */

router.post("/", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: "An email and password must be provided" });
    return
  }

  User
    .where({ email: email })
    .fetch()
    .then(() => {
      res.status(409).json({ message: "An account with this email already exists" });
    })
    .catch(() => {
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
        new List({user_id: newUser.id})
          .save().then(res => console.log("newList", res))
        new Person({user_id: newUser.id})
          .save().then(res => console.log("newPerson", res))
        const resBody = { token: jwt.sign({ user: newUser.attributes.uuid }, secret, {expiresIn: '1h'}) }
        res.status(201).json(resBody);
      })
    });
})

module.exports = router;