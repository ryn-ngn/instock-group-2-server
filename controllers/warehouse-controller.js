const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("warehouses");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving warehouses: ${error}`);
  }
};

const findOne = async (req, res) => {
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
    res.json(warehouseData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
  }
};

const posts = async (req, res) => {
  try {
    const posts = await knex("warehouses")
      .join("inventory", "inventory.warehouse_id", "inventory.id")
      .where({ inventory_id: req.params.id });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve warehouse for warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

const add = async (req, res) => {
  if (!req.body.warehouse_name) {
    return res.status(400).json({
      message:
        "Please provide warehouse name  for the warehouse in the request",
    });
  }

  try {
    const result = await knex("warehouses").insert(req.body);

    const newWarehouseId = result[0];
    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouseId,
    });

    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehouse: ${error}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const updatedWarehouse = await knex("warehouses").where({
      id: req.params.id,
    });

    res.json(updatedWarehouse[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
};

module.exports = {
  index,
  findOne,
  posts,
  add,
  update,
  remove,
};
