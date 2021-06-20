/* ------------------------------------------------------------
 * ROUTES TO /upload
 * ------------------------------------------------------------ */

const express = require("express");
const path = require('path');
const { v1: uuidv1 } = require('uuid');
const fileUpload = require("express-fileupload");
const Bookshelf = require("../bookshelf");
const { unlink } = require('fs/promises');

const router = express.Router();
router.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
}));

/* ------------------------------------------------------------
 * POST to upload user image
 * ------------------------------------------------------------ */

router.post("/user", (req, res) => {
  if (req.files === null) {
    res.status(400).json({message: "No file uploaded"});
    return
  }

  if (!req.body || !req.body.userUuid) {
    res.status(400).json({message: "A user ID must be provided"});
    return
  }

  const file = req.files.file;
  const userUuid = req.body.userUuid;

  const nameArr = file.name.split(".");
  const ext = nameArr[nameArr.length - 1];
  file.name = uuidv1() + "." + ext;

  const query = "UPDATE people SET image = :fileName WHERE (user_id = (SELECT users.id FROM users WHERE users.uuid = :uuid));"

  deleteUserImageFile(userUuid)
    .then(() => {
      return Promise.all([
        file.mv(path.join(__dirname, `../public/${file.name}`)),
        Bookshelf.knex.raw(query, {fileName: file.name, uuid: userUuid}),
      ])
    })
    .then(() => {
      res.status(200).json({fileName: file.name});
    })
    .catch(err => {
      res.status(500).send(err);
      console.error("/upload file.mv ERROR:", err);
    })
})

/* ------------------------------------------------------------
 * POST to upload gift image
 * ------------------------------------------------------------ */

router.post("/", (req, res) => {
  if (req.files === null) {
    res.status(400).json({message: "No file uploaded"});
    return
  }

  if (!req.body || !req.body.giftId) {
    res.status(400).json({message: "You must provide a gift ID"});
    return
  }

  const file = req.files.file;
  const gift_id = req.body.giftId;

  const nameArr = file.name.split(".");
  const ext = nameArr[nameArr.length - 1];
  file.name = uuidv1() + "." + ext;

  const query_details = "UPDATE gift_details SET image = :fileName WHERE (gift_id = :gift_id);"
  const query_gift = "UPDATE gifts SET date_modified = NOW() WHERE id = :gift_id;"

  deleteGiftImageFile(gift_id)
    .then(() => {
      return Promise.all([
        file.mv(path.join(__dirname, `../public/${file.name}`)),
        Bookshelf.knex.raw(query_details, {fileName: file.name, gift_id: gift_id}),
        Bookshelf.knex.raw(query_gift, {gift_id: gift_id})
      ])
    })
    .then(() => {
      res.status(200).json({fileName: file.name});
    })
    .catch(err => {
      res.status(500).send(err);
      console.error("/upload file.mv ERROR:", err);
    })
})

module.exports = router;

function deleteGiftImageFile(giftId) {
  const queryImageName = "SELECT image FROM gift_details WHERE (gift_id = :id);"
  return Bookshelf.knex.raw(queryImageName, {id: giftId})
    .then(result => {
      const filename = result[0][0].image;
      const filepath = path.join(__dirname, `../public/${filename}`);
      return unlink(filepath);
    })
}

function deleteUserImageFile(userUuid) {
  const queryImageName = "SELECT people.image FROM people WHERE people.user_id = (SELECT users.id FROM users WHERE uuid = :id);"
  return Bookshelf.knex.raw(queryImageName, {id: userUuid})
    .then(result => {
      const filename = result[0][0].image;
      const filepath = path.join(__dirname, `../public/${filename}`);
      return unlink(filepath);
    })
}