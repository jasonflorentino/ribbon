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

router.post("/", (req, res) => {
  if (req.files === null) {
    res.status(400).json({message: "No file uploaded"});
    utils.logResponse(res)
    return;
  }

  if (!req.body || !req.body.giftId) {
    res.status(400).json({message: "You must provide a gift ID"});
    utils.logResponse(res)
    return;
  }

  const file = req.files.file;
  const gift_id = req.body.giftId;

  const nameArr = file.name.split(".");
  const ext = nameArr[nameArr.length - 1];
  file.name = uuidv1() + "." + ext;

  const query_details = `UPDATE gift_details SET image = '${file.name}' WHERE (gift_id = ${gift_id});`
  const query_gift = `UPDATE gifts SET date_modified = NOW() WHERE id = ${gift_id};`

  Promise.all([
    file.mv(path.join(__dirname, `../public/${file.name}`)),
    Bookshelf.knex.raw(query_details),
    Bookshelf.knex.raw(query_gift)
  ])
  .then(() => {
    res.status(200).json({fileName: file.name});
    utils.logResponse(res);
  })
  .catch(err => {
    res.status(500).send(err);
    utils.logResponse(res);
    console.error("/upload file.mv ERROR:", err);
  })
})

module.exports = router;