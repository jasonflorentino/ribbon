const express = require("express");
const utils = require("../utils");
const Bookshelf = require("../bookshelf");

const router = express.Router();

router.get("/:id", (req, res) => {
  const query = (id) => {
    return `SELECT g.id, g.name, g.list_id, g.status, g.date_modified, g.date_created, gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link FROM gifts AS g INNER JOIN gift_details AS gd ON gd.gift_id = ${id} WHERE g.id = ${id};`
  }
  Bookshelf.knex.raw(query(req.params.id))
  .then(arr => {
    res.status(200).json(arr[0][0])
    utils.logResponse(res); 
  })
})

module.exports = router;