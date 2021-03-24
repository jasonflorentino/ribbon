exports.up = function (knex) {
  return knex.schema.createTable("gifts", (table) => {
    table.increments("id").primary();
    table.integer("list_id").notNullable().unsigned().references("id").inTable("lists").onUpdate("CASCADE").onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("status").notNullable().defaultTo("available");
    table.integer("gifted_by").unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("NO ACTION") ;
    table.timestamp("date_modified").defaultTo(knex.fn.now());
    table.timestamp("date_created").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("gifts");  
};