const giftData = require("../seed_data/gifts");

exports.seed = function (knex) {
  return knex("gifts")
    .del()
    .then(() => knex("lists").pluck("id"))
    .then((listIds) => {
      return giftData.map((gift, i) => {
        if (i < listIds.length) {
          // Assign one gift per list in order
          gift.list_id = listIds[i];
        } else {
          // Assign further gifts at random
          const randomList = Math.floor(Math.random() * listIds.length);
          gift.list_id = listIds[randomList];
        }
        return gift;
      })
    })
    .then(updatedGifts => knex("gifts").insert(updatedGifts));
};