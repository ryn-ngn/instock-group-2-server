const knex = require("knex")(require("../knexfile"));

const getAllWarehouses = async (_req, res) => {
  try {
    const data = await knex("warehouses");

    const warehouseData = data.map((warehouseInfo) => {
      const {
        id,
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      } = warehouseInfo;

      return {
        id,
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      };
    });

    res.status(200).json(warehouseData);
  } catch (error) {
    res.status(400).send(`Error retrieving warehouses: ${error}`);
  }
};

//This method will find a single warehouse with specific id
const getWarehouseById = async (req, res) => {
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

// This method will delete a single warehouse with specific id
const deleteWarehouseById = async (req, res) => {
  try {
    let rowsDeleted = await knex("warehouses").where({ id: req.params.id });

    if (rowsDeleted.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} is not found`,
      });
    }

    rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
  deleteWarehouseById,
};
