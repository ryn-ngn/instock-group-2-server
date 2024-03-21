const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving warehouses: ${error}`);
  }
};

//this is to find a single warehouse
const findWarehouse = async (req, res) => {
  try {
    const warehousesFound = await knex("warehouses").where({
      id: req.params.id,
    });
    if (warehousesFound.length === 0) {
      return res.status(404).json({
        message: `warehouse with ID ${req.params.id} not found`,
      });
    }
    const warehouseData = warehousesFound[0];
    res.status(200).json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  index,
  findWarehouse,
};
