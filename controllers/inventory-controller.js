const knex = require("knex")(require("../knexfile"));

const getAllInventories = async (_req, res) => {
  try {
    const data = await knex("inventories");
    const dataWarehouse = await knex("warehouses");

    const inventoryData = data.map((item) => {
      const {
        id,
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity,
      } = item;

      const { warehouse_name } = dataWarehouse.find(
        (w) => w.id === warehouse_id
      );

      return {
        id,
        warehouse_name,
        item_name,
        description,
        category,
        status,
        quantity,
      };
    });

    res.status(200).json(inventoryData);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
  }
};

module.exports = {
  getAllInventories,
};
