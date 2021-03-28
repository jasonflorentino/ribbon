const bookshelf = require("../bookshelf");

const Gift = bookshelf.model("Gift", {
  tableName: "gifts",
  gift_detail: function() {
    return this.hasOne("GiftDetail");
  },
  list: function() {
    return this.belongsTo("List");
  },
  gifted_by: function() {
    return this.belongsTo("User", "gifted_by");
  },
});

module.exports = Gift;