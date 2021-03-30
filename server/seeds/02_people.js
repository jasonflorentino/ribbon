const peopleData = require("../seed_data/people");

exports.seed = function (knex) {
    return knex("people")
        .del()
        .then(() => {
          return knex("users")
              .pluck("id")
        }).then((userIds) => {
          return peopleData.map((person, i) => {
              person.user_id = userIds[i];
              return person;
          });
      }).then(updatedPeople => knex("people").insert(updatedPeople));
};