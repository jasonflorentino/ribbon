exports.up = function (knex) {
  return knex.schema.createTable("connections", (table) => {
    table.increments("id").primary();
    table.integer("requester_id").notNullable().unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    table.integer("addressee_id").notNullable().unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    table.string("status").notNullable().defaultTo("pending");
    table.timestamp("date_created").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("connections");  
};