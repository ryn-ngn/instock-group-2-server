const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    const dataWarehouse = await knex("warehouses");

    const inventoryData = data.map((item) => {
      const container = {};
      container.id = item.id;
      container.warehouse_name = dataWarehouse.find(
        (w) => w.id === item.warehouse_id
      ).warehouse_name;
      container.item_name = item.item_name;
      container.description = item.description;
      container.category = item.category;
      container.status = item.status;
      container.quantity = item.quantity;

      return container;
    });

    res.status(200).json(inventoryData);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
  }
};

module.exports = {
  index,
};
