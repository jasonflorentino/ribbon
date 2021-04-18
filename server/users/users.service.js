const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig);
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const AT_SECRET = process.env.JWT_SECRET;
const AT_LIFE = process.env.ACCESS_TOKEN_LIFE;
const R_SECRET = process.env.REFRESH_TOKEN_SECRET;
const R_LIFE = process.env.REFRESH_TOKEN_LIFE;

module.exports = {
    authenticate,
    create,
};

async function authenticate({ email, password }) {
  if (!email || !password) throw "An email and password must be provided";

  const queryResult = await knex("users")
                      .join("people", "users.id", "=", "people.user_id")
                      .join("lists", "users.id", "=", "lists.user_id")
                      .select("users.password", "users.uuid", "people.first_name", "people.last_name", "people.date_of_birth", "people.image", "lists.id as list_id")
                      .where("users.email", email);
                      
  const user = queryResult[0];

  const incomingPass = CryptoJS.SHA1(password + user.uuid);
  if (user.password === incomingPass.toString(CryptoJS.enc.Base64)) {
    const accessToken = jwt.sign({ user: user.uuid }, AT_SECRET, { expiresIn: AT_LIFE });
    const refreshToken = jwt.sign({ user: user.uuid }, R_SECRET, { expiresIn: R_LIFE });

    // TODO: Store refresh token in DB
    delete user.password;
    return {
      user: user,
      token: accessToken
    };
  }
}

async function create() {
  return;
}