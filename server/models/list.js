const bookshelf = require("../bookshelf");

const List = bookshelf.model("List", {
  tableName: "lists",
  gift: function() {
    return this.hasMany("Gift");
  },
  user: function() {
    return this.belongsTo("User");
  },
});

module.exports = List;