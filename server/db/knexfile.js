require('dotenv').config();

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_HOST,
    password: process.env.DB_PSWD,
    database: "ribbon",
    charset: "utf8"
  }
};
