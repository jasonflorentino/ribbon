const express = require("express");
const utils = require("../utils");
const User = require("../models/user");
const Bookshelf = require('../bookshelf');

const router = express.Router();

router.get("/", (req, res) => {

  const query = "SELECT p.first_name, p.last_name, p.image, users.uuid FROM people as p INNER JOIN users ON users.id = p.user_id CROSS JOIN connections AS c WHERE (c.requester_id = :id AND p.user_id = c.addressee_id) OR (c.addressee_id = :id AND p.user_id = c.requester_id);"

  User
    .where({ uuid: req.decode.user })
    .fetch()
    .then(user => {
      return Bookshelf.knex.raw(query, {id: user.id})
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

router.get("/check/:id", (req, res) => {
  const targetUuid = req.params.id;
  const uuid = req.decode.user;
  const queryConnections = "SELECT * FROM connections AS c WHERE (c.requester_id = (SELECT users.id FROM users WHERE users.uuid = :uuid)) OR (addressee_id = (SELECT users.id FROM users WHERE users.uuid = :uuid));" 
  const queryIds = "SELECT u.id, u.uuid FROM users AS u WHERE u.uuid = :uuid OR u.uuid = :targetUuid;"
  const queryMakeConnection = "INSERT INTO connections (requester_id, addressee_id) VALUES (:currUserId, :targetUserId)";

  Promise.all([
    Bookshelf.knex.raw(queryConnections, {uuid: uuid}),
    Bookshelf.knex.raw(queryIds, {uuid: uuid, targetUuid: targetUuid})
  ])
    .then(result => {
      const connections = result[0][0];
      const users = result[1][0];
      const currUser = users.filter(row => row.uuid === uuid)[0];
      const targetUser = users.filter(row => row.uuid === targetUuid)[0];

      if (connections.length === 0) {
        return Bookshelf.knex.raw(queryMakeConnection, {currUserId: currUser.id, targetUserId: targetUser.id});
      } else {
        const existingConnections = connections.filter(
          connection => connection.requester_id === targetUser.id 
                     || connection.addressee_id === targetUser.id
        );
        if (existingConnections.length === 0) {
          return Bookshelf.knex.raw(queryMakeConnection, {currUserId: currUser.id, targetUserId: targetUser.id});
        } else {
          return false;
        }
      }
    })
    .then(result => {
      res.status(200).json({connectionCreated: !!result});
      utils.logResponse(res);
    })
    .catch(err => {
      console.log("ERROR: HEAD to connections/", err.message);
      res.status(500).json({ message: "There was an error with the server" });
      utils.logResponse(res);
    })
})

module.exports = router;