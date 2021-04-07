/* ------------------------------------------------------------
 * ROUTES TO /login
 * ------------------------------------------------------------ */

const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const utils = require("../utils");
const User = require("../models/user");

const router = express.Router();
const secret = process.env.JWT_SECRET;

/* ------------------------------------------------------------
 * POST to log user in
 * ------------------------------------------------------------ */

router.post("/", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: "An email and password must be provided" })
    return utils.logResponse(res);
  }

  User
    .where({ email: email })
    .fetch()
    .then(user => {
      const matched = user.attributes;
      const incomingPass = CryptoJS.SHA1(password + matched.uuid);
      if (matched.password === incomingPass.toString(CryptoJS.enc.Base64)) {
        const resBody = { token: jwt.sign({ user: matched.uuid }, secret, {expiresIn: '1h'}) }
        res.status(200).json(resBody);
        utils.logResponse(res);
        return;
      }
      res.status(403).json({message: "The password provided is incorrect"})
      utils.logResponse(res);
    })
    .catch(() => {
      res.status(400).json({ message: "Couldn't find a user with this email" })
      utils.logResponse(res)
    });
})

module.exports = router;