const knexConfig = process.env.NODE_ENV === 'production'
  ? require("./knexfile").production
  : require("./knexfile").development;

module.exports = knexConfig;