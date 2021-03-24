require('dotenv').config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PSWD;

module.exports = {
  client: "mysql",
  connection: {
    host: host,
    user: user,
    password: password,
    database: "ribbon",
    charset: "utf8"
  }
};