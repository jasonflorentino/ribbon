const bookshelf = require("../bookshelf");

const Connection = bookshelf.model("Connection", {
  tableName: "connections",
  requester: function() {
    return this.belongsTo("User", "requester_id");
  },
  addressee: function() {
    return this.belongsTo("User", "addressee_id");
  },
});

module.exports = Connection;