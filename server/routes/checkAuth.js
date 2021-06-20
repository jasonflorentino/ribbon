const express = require("express");
const Bookshelf = require("../bookshelf");
const { makeError: error } = require("../_helpers/errorHandler");

const router = express.Router();

// Route
router.get("/", checkAuth);

// Controller
function checkAuth(req, res, next) {
  loginService(req.decode)
    .then(result => res.status(200).json(result))
    .catch(err => next(err));
}

// Service
async function loginService(userData) {
  const query = "SELECT p.image, p.first_name, l.id AS list_id FROM people AS p INNER JOIN users AS u LEFT JOIN lists AS l ON l.user_id = u.id WHERE p.user_id = u.id AND u.uuid = :uuid;";

  return Bookshelf.knex.raw(query, {uuid: userData.user})
  .then(result => {
    if (result[0].length === 0) throw error(403, "Couldn't authenticate user");

    const data = result[0][0];
    userData.image = data.image || "placeholder.png";
    userData.first_name = data.first_name;
    userData.list_id = data.list_id;
    return userData;
  })
  .catch(err => {
    if (err.status) throw err;
    console.error(err);
    next(err);
  })
}

module.exports = router;