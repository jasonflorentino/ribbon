const giftData = require("../seed_data/gifts");

exports.seed = function (knex) {
  return knex("gifts")
    .del()
    .then(() => knex("lists").pluck("id"))
    .then((listIds) => {
      return giftData.map((gift) => {
        const randomIndex = Math.floor(Math.random() * listIds.length);
        gift.list_id = listIds[randomIndex];
        return gift;
      });
    })
    .then(updatedGifts => knex("gifts").insert(updatedGifts));
};