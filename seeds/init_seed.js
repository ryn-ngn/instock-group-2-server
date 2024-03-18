const warehousesData = require("../seed-data/warehouses");
const inventoriesData = require("../seed-data/inventories");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("warehouse").del();
  await knex("inventory").del();

  await knex("warehouse").insert(warehousesData);
  await knex("inventory").insert(inventoriesData);
};
