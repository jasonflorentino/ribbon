exports.up = function (knex) {
  return knex.schema.table("lists", (table) => {
      table.string("description");
  });
};

exports.down = function (knex) {
  return knex.schema.table("lists", (table) => {
      table.dropColumn("description");
  });
};
