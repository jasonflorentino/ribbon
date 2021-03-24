const connectionsData = require("../seed_data/connections");

exports.seed = function (knex) {
  return knex("connections")
    .del()
    .then(() => knex("users").pluck("id"))
    .then((userIds) => {
      return connectionsData.map((conection, i) => {
        i = i + 1;
        const j = (i < userIds.length-1) ? i+1 : 1;
        conection.requester_id = userIds[i];
        conection.addressee_id = userIds[j];
        return conection;
      });
    })
    .then(updateConnectionsData => knex("connections").insert(updateConnectionsData));
};