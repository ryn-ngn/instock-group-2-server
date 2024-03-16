exports.up = function (knex) {
  return knex.schema
    .createTable("warehouse", (table) => {
      // create primary key
      table.increments("id").primary();

      table.string("warehouse_name").notNullable();
      table.string("address").notNullable();
      table.string("email").notNullable();
      table.string("city").notNullable();
      table.string("country").notNullable();
      table.string("contact_name").notNullable();
      table.string("contact_position").notNullable();
      table.string("contact_email").notNullable();
      table.string("contact_phone").notNullable();
      // to get the time now of your server, you can use `knex.fn.now();`
      table.timestamp("created_at").defaultTo(knex.fn.now());

      // knex.raw(...) allows you to inject raw SQL into your knex client
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("inventory", (table) => {
      table.increments("id").primary();

      table.string("item_name").notNullable();
      table.string("category").notNullable();
      table.integer("quantity").notNullable().defaultTo(0).integer(); //number type

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));

      // reference the foreign table
      table
        .integer("warehouse_id")
        .unsigned()
        .references("warehouse.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("inventory").dropTable("warehouse");
};
