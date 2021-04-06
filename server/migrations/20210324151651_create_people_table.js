exports.up = function (knex) {
  return knex.schema.createTable("people", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    table.string("first_name").defaultTo("New User");
    table.string("last_name").defaultTo("");
    table.date("date_of_birth").defaultTo("2000-01-01");
    table.string("image").defaultTo("placeholder.png");
    table.string("interests", 400);
    table.string("allergies", 400);
    table.string("sizes", 400);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("people");  
};
