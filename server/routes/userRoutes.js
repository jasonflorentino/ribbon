const express = require("express");
const utils = require("../utils");
const Bookshelf = require("../bookshelf");

const router = express.Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const listQuery = "SELECT g.id, g.name, g.list_id, g.status, g.gifted_by, g.date_modified, g.date_created,gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link, p.first_name FROM gifts AS g INNER JOIN gift_details AS gd ON gd.gift_id = g.id LEFT JOIN people AS p ON g.gifted_by = p.user_id WHERE g.list_id IN (SELECT users.id FROM users WHERE users.uuid = :id);"
  const userQuery = "SELECT p.first_name, p.image FROM people AS p WHERE p.id = (SELECT users.id FROM users WHERE users.uuid = :id)"

  Bookshelf.knex.raw(listQuery, {id: id})
  .then(arr1 => {
    Bookshelf.knex.raw(userQuery, {id: id})
    .then(arr2 => {
      return {items: arr1[0], user: arr2[0][0]}
    })
    .then(data => {
      res.status(200).json(data)
      utils.logResponse(res); 
    })
  })
  .catch(err => {
    console.log("ERROR in userRoutes GET /:id - ", err.message);
    res.status(500).json({message: "Couldn't fetch data"})
    utils.logResponse(res);
  })
})

router.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT p.first_name, p.last_name, p.date_of_birth, p.image, p.interests, p.allergies, p.sizes, p.user_id FROM people as p INNER JOIN users ON users.id = p.user_id WHERE (users.uuid = :id)"

  Bookshelf.knex.raw(query, {id: id})
    .then(result => {
      res.status(200).json(result[0]);
    })
    .catch(err => {
      console.log("ERROR in userRoutes GET /profile/:id - ", err.message);
      res.status(500).json({message: "Couldn't fetch data"})
      utils.logResponse(res);
    })
})

router.put("/:id", (req, res) => {
  if ( !req.body 
    || !req.body.first_name 
    || !req.body.last_name 
  ) {
    res.status(400).json({message: "You must provide proper user details"});
    utils.logResponse(res);
    return;
  }

  const { 
    uuid,
    first_name, 
    last_name, 
    date_of_birth = "NULL", 
    interests = "NULL", 
    allergies = "NULL", 
    sizes = "NULL" 
  } = req.body;

  const id = req.params.id;
  const query = "UPDATE people SET first_name = :first_name, last_name = :last_name, date_of_birth = :date_of_birth, interests = :interests, allergies = :allergies, sizes = :sizes WHERE (user_id = (SELECT users.id FROM users WHERE users.uuid = :uuid));"

  Bookshelf.knex.raw(query, {first_name: first_name,
                             last_name: last_name,
                             date_of_birth: date_of_birth,
                             interests: interests,
                             allergies: allergies,
                             sizes: sizes,
                             uuid: uuid})
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log("ERROR in userRoutes PUT /:id - ", err.message);
    res.status(500).json({message: "Couldn't update data"})
    utils.logResponse(res);
  })
})

module.exports = router;