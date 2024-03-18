const warehousesData = require("../seed-data/warehouses");
const inventoriesData = require("../seed-data/inventories");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("warehouses").del();
  await knex("inventories").del();

  await knex("warehouses").insert(warehousesData);
  await knex("inventories").insert(inventoriesData);
};
