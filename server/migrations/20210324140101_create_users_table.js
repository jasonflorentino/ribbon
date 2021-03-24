exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.uuid("uuid").notNullable();
    table.timestamp("date_last_login").defaultTo(knex.fn.now());
    table.timestamp("date_created").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");  
};
