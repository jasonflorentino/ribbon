const express = require("express");
const router = express.Router();
const userService = require("./users.service");

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/:id', getById);

module.exports = router;

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(result => {
      if (result) {
        res.cookie("jwt", result.token, {httpOnly: true});
        // res.cookie("jwt", result.token, {secure: true, httpOnly: true});
        res.json(result.user);
      }
      else res.status(403).json({ message: 'Username or password is incorrect' });
    })
    .catch(err => next(err));
}

function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}