const express = require("express");
const utils = require("../utils");
const Bookshelf = require("../bookshelf");

const router = express.Router();

router.get("/:id", (req, res) => {
  const query = (id) => {
    return `SELECT g.id, g.name, g.list_id, g.status, g.gifted_by, g.date_modified, g.date_created, gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link FROM gifts AS g INNER JOIN gift_details AS gd ON gd.gift_id = ${id} WHERE g.id = ${id};`
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

module.exports = router;

// UPDATE `ribbon`.`gifts` SET `gifted_by` = '10' WHERE (`id` = '16');
// UPDATE `ribbon`.`gifts` SET `status` = 'claimed' WHERE (`id` = '16');