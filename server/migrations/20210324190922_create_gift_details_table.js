exports.up = function (knex) {
  return knex.schema.createTable("gift_details", (table) => {
    table.increments("id").primary();
    table.integer("gift_id").notNullable().unsigned().references("id").inTable("gifts").onUpdate("CASCADE").onDelete("CASCADE");
    table.string("image");
    table.decimal("price").notNullable();
    table.string("color");
    table.string("size");
    table.text("description");
    table.string("category");
    table.string("product_sku");
    table.string("vendor");
    table.string("brand");
    table.string("external_link", 400);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("gift_details");  
};