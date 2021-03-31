exports.up = function (knex) {
  return knex.schema.table("lists", (table) => {
      table.text("description");
  });
};

exports.down = function (knex) {
  return knex.schema.table("lists", (table) => {
      table.dropColumn("description");
  });
};
