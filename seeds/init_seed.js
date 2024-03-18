const warehousesData = require("../seed-data/01_warehouses");
const inventoriesData = require("../seed-data/02_inventories");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("warehouses").del();
  await knex("inventories").del();

  await knex("warehouses").insert(warehousesData);
  await knex("inventories").insert(inventoriesData);
};
