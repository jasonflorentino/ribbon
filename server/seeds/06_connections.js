exports.seed = function (knex) {
  return knex("connections")
    .del()
    .then(() => knex("users").pluck("id"))
    .then((userIds) => {
      const connections = [];
      for (let i = 0; i < userIds.length; i++) {
        for (let j = i+1; j < userIds.length; j++) {
          const newConnection = {
            requester_id: userIds[i],
            addressee_id: userIds[j],
            status: "accepted"
          }
          connections.push(newConnection);
        }
      }
      return connections;
    })
    .then(updateConnectionsData => knex("connections").insert(updateConnectionsData));
};