const giftDetailsData = require("../seed_data/gift_details");

exports.seed = function (knex) {
  return knex("gift_details")
    .del()
    .then(() => knex("gifts").pluck("id"))
    .then((giftIds) => {
      return giftDetailsData.map((giftDetail, i) => {
        giftDetail.gift_id = giftIds[i];
        return giftDetail;
      });
    })
    .then(updatedGiftDetails => knex("gift_details").insert(updatedGiftDetails));
};