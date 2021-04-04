const express = require("express");
const utils = require("../utils");
const User = require("../models/user");
const List = require("../models/list");
const Gift = require("../models/gift");
const GiftDetail = require("../models/gift_detail");
const Bookshelf = require("../bookshelf");

const router = express.Router();

router.get("/", (req, res) => {

  const id = req.decode.user;
  const query = "SELECT g.id, g.name, g.list_id, g.status, g.date_modified, g.date_created,gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link FROM gifts AS g INNER JOIN gift_details AS gd ON gd.gift_id = g.id WHERE g.list_id IN (SELECT users.id FROM users WHERE users.uuid = :id);"

  Bookshelf.knex.raw(query, {id: id})
  .then(data => {
    res.status(200).json(data[0])
    utils.logResponse(res); 
  })
  .catch(err => {
    console.log("DB Query Error:", err.message);
    res.status(500).json({ message: "Error fetching data" });
    utils.logResponse(res);
  })
})

module.exports = router;