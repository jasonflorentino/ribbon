const bookshelf = require("../bookshelf");

const Person = bookshelf.model("Person", {
  tableName: "people",
  user: function() {
    return this.belongsTo("User");
  },
});

module.exports = Person;