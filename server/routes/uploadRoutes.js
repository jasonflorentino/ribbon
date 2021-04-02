const express = require("express");
const fileUpload = require("express-fileupload");
const utils = require("../utils");
const Bookshelf = require("../bookshelf");

const router = express.Router();
router.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}));

router.post("/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({message: "No file uploaded"});
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/${file.name}`, err => {
    if (err) {
      console.error("/upload file.mv ERROR:", err);
      return res.status(500).send(err);
    }

    res.status(200).json({fileName: file.name});
  })

})

module.exports = router;