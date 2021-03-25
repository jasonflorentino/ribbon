const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  people: function() {
    return this.hasOne("Person");
  },
  connection: function() {
    return this.hasMany("Connection");
  },
  lists: function() {
    return this.hasMany("List");
  },
  gifts: function() {
    return this.hasMany("Gift");
  }
});

module.exports = User;