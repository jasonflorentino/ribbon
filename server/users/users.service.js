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
    getById,
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

async function getById(id) {
  const listQuery = "SELECT g.id, g.name, g.list_id, g.status, g.gifted_by, g.date_modified, g.date_created,gd.image, gd.price, gd.color, gd.size, gd.description, gd.category, gd.external_link, p.first_name FROM gifts AS g INNER JOIN gift_details AS gd ON gd.gift_id = g.id LEFT JOIN people AS p ON g.gifted_by = p.user_id WHERE g.list_id IN (SELECT users.id FROM users WHERE users.uuid = :id);"
  const userQuery = "SELECT p.first_name, p.image FROM people AS p WHERE p.id = (SELECT users.id FROM users WHERE users.uuid = :id)"

  Bookshelf.knex.raw(listQuery, {id: id})
  .then(arr1 => {
    Bookshelf.knex.raw(userQuery, {id: id})
    .then(arr2 => {
      return {items: arr1[0], user: arr2[0][0]}
    })
    .then(data => {
      res.status(200).json(data); 
    })
  })
  .catch(err => {
    console.log("ERROR in userRoutes GET /:id - ", err.message);
    res.status(500).json({message: "Couldn't fetch data"});
  })
}