const express = require("express");
const utils = require("../utils");
const User = require("../models/user");
const Bookshelf = require('../bookshelf');

const router = express.Router();

router.get("/", (req, res) => {

  const rawSql = function(id) {
    return `SELECT p.first_name, p.last_name, p.image, users.uuid FROM people as p INNER JOIN users ON users.id = p.user_id CROSS JOIN connections AS c WHERE (c.requester_id = ${id} AND p.user_id = c.addressee_id) OR (c.addressee_id = ${id} AND p.user_id = c.requester_id);`
  }

  User
    .where({ uuid: req.decode.user })
    .fetch()
    .then(user => {
      const query = rawSql(user.id);
      return Bookshelf.knex.raw(query)
        .then(arr => {
          res.status(200).json(arr[0])
          utils.logResponse(res); 
        })
    })
    .catch(err => {
      console.log("DB Query Error:", err.message);
      res.status(500).json({ message: "Error fetching data" });
      utils.logResponse(res);
    })
})

module.exports = router;