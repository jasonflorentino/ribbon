const express = require("express");
const utils = require("../utils");
const Bookshelf = require("../bookshelf");

const router = express.Router();

router.get("/:id", (req, res) => {
  const query = (id) => {
    return `SELECT g.id, g.name, g.list_id, g.status, g.gifted_by, g.date_modified, g.date_created, gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link, people.first_name FROM gifts AS g LEFT JOIN people ON g.gifted_by = people.user_id INNER JOIN gift_details AS gd ON gd.gift_id = ${id} WHERE g.id = ${id};`
  }
  Bookshelf.knex.raw(query(req.params.id))
  .then(arr => {
    res.status(200).json(arr[0][0])
    utils.logResponse(res); 
  })
  .catch(err => {
    console.log("ERROR in giftRoutes GET /:id - ", err.message);
    res.status(500).json({message: "Couldn't fetch data"})
    utils.logResponse(res);
  })
})

router.put("/:id/claim", (req, res) => {
  const itemId = req.params.id;
  const claimerUuid = req.query.user;
  const query1 = (itemId, claimerUuid) => {
    return `UPDATE gifts SET gifted_by = (SELECT users.id FROM users WHERE users.uuid = '${claimerUuid}') WHERE (id = '${itemId}');`
  }
  const query2 = (itemId) => {
    return `UPDATE gifts SET status = 'claimed' WHERE (id = '${itemId}');`
  }

  Bookshelf.knex.raw(query1(itemId, claimerUuid))
  .then(() => {
    Bookshelf.knex.raw(query2(itemId))
    .then(() => {
      res.status(200).json({message: "Update successful"});
      utils.logResponse(res); 
    })
  })
  .catch(err => {
    console.log("ERROR in giftRoutes PUR /:id/claim - ", err.message);
    res.status(500).json({message: "Couldn't update data"})
    utils.logResponse(res);
  })
})

module.exports = router;