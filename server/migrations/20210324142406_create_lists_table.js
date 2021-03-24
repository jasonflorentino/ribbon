exports.up = function(knex) {
  return knex.schema.createTable("lists", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    table.string("visibility").notNullable().defaultTo("private");
    table.timestamp("date_modified").defaultTo(knex.fn.now());
    table.timestamp("date_created").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("lists");  
};
