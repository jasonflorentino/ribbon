/* ------------------------------------------------------------
 * ROUTES TO /list
 * ------------------------------------------------------------ */

const express = require("express");
const Bookshelf = require("../bookshelf");

const router = express.Router();

router.get("/", getListItems);

/* ------------------------------------------------------------
 * GET items in a user's list
 * ------------------------------------------------------------ */

function getListItems(req, res, next) {
  const id = req.decode.user;
  const query = "SELECT g.id, g.name, g.list_id, g.status, g.date_modified, g.date_created,gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link FROM gifts AS g INNER JOIN gift_details AS gd ON gd.gift_id = g.id WHERE g.list_id IN (SELECT users.id FROM users WHERE users.uuid = :id);"

  Bookshelf.knex.raw(query, {id: id})
  .then(data => {
    res.status(200).json(data[0]);
  })
  .catch(err => {
    console.log("DB Query Error:", err.message);
    next(err);
  })
}

module.exports = router;