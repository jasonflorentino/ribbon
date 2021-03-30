const listData = require("../seed_data/lists");

exports.seed = function (knex) {
  return knex("lists")
    .del()
    .then(() => knex("users").pluck("id"))
    .then((userIds) => {
      return listData.map((list, i) => {
        list.user_id = userIds[i];
        return list;
      });
    })
    .then(updatedLists => knex("lists").insert(updatedLists));
};