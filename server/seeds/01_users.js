const CryptoJS = require("crypto-js");
const usersData = require("../seed_data/users");

exports.seed = function (knex) {
    return knex("users")
        .del()
        .then(() => {
          return usersData.map(user => {
            const hash = CryptoJS.SHA1(user.password + user.uuid);
            user.password = hash.toString(CryptoJS.enc.Base64);
            return user;
          })
        }).then(updatedUsers => knex("users").insert(updatedUsers));
};