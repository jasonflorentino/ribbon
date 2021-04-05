/* ------------------------------------------------------------
 * ROUTES TO /gifts
 * ------------------------------------------------------------ */

const express = require("express");
const path = require('path');
const { v1: uuidv1 } = require('uuid');
const fileUpload = require("express-fileupload");
const utils = require("../utils");
const Bookshelf = require("../bookshelf");

const router = express.Router();

router.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}));

/* ------------------------------------------------------------
 * FETCH GIFT INFO
 * ------------------------------------------------------------ */

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT g.id, g.name, g.list_id, g.status, g.gifted_by, g.date_modified, g.date_created, gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link, people.first_name FROM gifts AS g LEFT JOIN people ON g.gifted_by = people.user_id INNER JOIN gift_details AS gd ON gd.gift_id = :id WHERE g.id = :id;"

  Bookshelf.knex.raw(query, {id: id})
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

/* ------------------------------------------------------------
 * CLAIM, RELEASE, EDIT
 * ------------------------------------------------------------ */

router.put("/:id/claim", (req, res) => {
  const itemId = req.params.id;
  const claimerUuid = req.query.user;
  const query1 = "UPDATE gifts SET gifted_by = (SELECT users.id FROM users WHERE users.uuid = :claimerUuid) WHERE (id = :itemId);"
  const query2 = "UPDATE gifts SET status = 'claimed' WHERE (id = :itemId);"

  Bookshelf.knex.raw(query1, {claimerUuid: claimerUuid, itemId: itemId})
  .then(() => {
    Bookshelf.knex.raw(query2, {itemId: itemId})
    .then(() => {
      res.status(200).json({message: "Update successful"});
      utils.logResponse(res); 
    })
  })
  .catch(err => {
    console.log("ERROR in giftRoutes PUT /:id/claim - ", err.message);
    res.status(500).json({message: "Couldn't update data"})
    utils.logResponse(res);
  })
})

router.put("/:id/release", (req, res) => {
  const itemId = req.params.id;
  const query1 = "UPDATE gifts SET gifted_by = NULL WHERE (id = :itemId);"
  const query2 = "UPDATE gifts SET status = 'available' WHERE (id = :itemId);"

  Bookshelf.knex.raw(query1, {itemId: itemId})
  .then(() => {
    Bookshelf.knex.raw(query2, {itemId: itemId})
    .then(() => {
      res.status(200).json({message: "Update successful"});
      utils.logResponse(res); 
    })
  })
  .catch(err => {
    console.log("ERROR in giftRoutes PUT /:id/release - ", err.message);
    res.status(500).json({message: "Couldn't update data"})
    utils.logResponse(res);
  })
})

router.put("/:id/edit", (req, res) => {
  if ( !req.body 
    || !req.body.gift_id 
    || !req.body.name 
    || req.body.price < 0
    || req.body.price === null
    || req.body.price === undefined
  ) {
    res.status(400).json({message: "You must provide proper item details"});
    utils.logResponse(res);
    return;
  }

  const { 
    gift_id, 
    name, 
    price, 
    color = "NULL", 
    size = "NULL", 
    description = "NULL" 
  } = req.body;

  const query1 = `UPDATE gift_details SET price = :price, color = :color, size = :size, description = :description WHERE (gift_id = :gift_id);`;
  const query2 = `UPDATE gifts SET name = :name, date_modified = NOW() WHERE (id = :gift_id)`;

  Promise.all([
    Bookshelf.knex.raw(query1, {price: price, color: color, size: size, description: description, gift_id: gift_id}),
    Bookshelf.knex.raw(query2, {name: name, gift_id: gift_id})
  ])
  .then((result) => {
    res.status(200).json({message: `${name} was updated successfully`});
    utils.logResponse(res);
  })
  .catch(err => {
    res.status(500).send(err);
    utils.logResponse(res);
    console.error(`/gifts/${gift_id}/edit DB ERROR:`, err);
  })
})

/* ------------------------------------------------------------
 * CREATE NEW GIFT
 * ------------------------------------------------------------ */

router.post("/new", (req, res) => {
  if (req.files === null) {
    res.status(400).json({message: "No file uploaded"});
    utils.logResponse(res)
    return;
  }

  if (!req.body || !req.body.itemDetails) {
    res.status(400).json({message: "You must provide proper item details"});
    utils.logResponse(res)
    return;
  }

  const imageFile = req.files.image;
  const details = JSON.parse(req.body.itemDetails);

  const nameArr = imageFile.name.split(".");
  const ext = nameArr[nameArr.length - 1];
  imageFile.name = uuidv1() + "." + ext;

  const query_gift = "INSERT INTO gifts (list_id, name) VALUES (:list_id, :name);"
  const query_details = "INSERT INTO gift_details (gift_id, image, price, color, size, description, external_link) VALUES (:gift_id, :image, :price, :color, :size, :description, :external_link);"

  let gift_id;
  Bookshelf.knex.raw(query_gift, {list_id: details.list_id, name: details.name})
    .then(result => {
      gift_id = result[0].insertId;
      return Promise.all([
        imageFile.mv(path.join(__dirname, `../public/${imageFile.name}`)),
        Bookshelf.knex.raw(query_details, {
          gift_id: gift_id, 
          image: imageFile.name,
          price: details.price,
          color: details.color,
          size: details.size,
          description: details.description,
          external_link: details.external_link
        })
      ])
    })
    .then(() => {
      res.status(201).json({message: `Item ${gift_id} created successfully!`})
    })
    .catch(err => {
      res.status(500).send(err);
      utils.logResponse(res);
      console.error("Create New Gift ERROR:", err);
    })
})

module.exports = router;