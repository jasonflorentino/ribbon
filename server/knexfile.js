require('dotenv').config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD,
      database: "ribbon",
      charset: "utf8"
    }
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL
  }
};