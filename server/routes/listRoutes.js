const express = require("express");
const utils = require("../utils");
const User = require("../models/user");
const List = require("../models/list");
const Gift = require("../models/gift");
const GiftDetail = require("../models/gift_detail");

const router = express.Router();

router.get("/", (req, res) => {

  User
    .where({ uuid: req.decode.user })
    .fetch()
    .then(user => {
      List
        .where({ user_id: user.id })
        .fetch()
        .then(list => {
          Gift
            .where({ list_id: list.id })
            .fetchAll({withRelated: ["gift_detail"]})
            .then(gifts => {
              res.status(200).json(gifts);
              utils.logResponse(res);
              return;
            })
        })
    })
    .catch(err => {
      console.log("DB Query Error:", err.message);
      res.status(500).json({ message: "Error fetching data" });
      utils.logResponse(res);
    })
})

module.exports = router;