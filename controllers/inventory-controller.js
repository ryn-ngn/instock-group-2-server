const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
  }
};

const findOne = async (req, res) => {
  try {
    const inventoriesFound = await knex("inventories").where({
      id: req.params.id,
    });

    if (inventoriesFound.length === 0) {
      return res.status(404).json({
        message: `inventory with ID ${req.params.id} not found`,
      });
    }

    const inventoryData = inventoriesFound[0];
    res.json(inventoryData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory data for inventory with ID ${req.params.id}`,
    });
  }
};

const posts = async (req, res) => {
  try {
    const posts = await knex("inventories")
      .join("warehouse", "warehouse.inventory_id", "warehouse.id")
      .where({ warehouse_id: req.params.id });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventory for inventory with ID ${req.params.id}: ${error}`,
    });
  }
};

const add = async (req, res) => {
  if (!req.body.item_name) {
    return res.status(400).json({
      message:
        "Please provide inventory name  for the inventory in the request",
    });
  }

  try {
    const result = await knex("inventories").insert(req.body);

    const newInventoryId = result[0];
    const createdInventory = await knex("inventories").where({
      id: newInventoryId,
    });

    res.status(201).json(createdInventory);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory: ${error}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("inventories")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    const updatedInventory = await knex("inventories").where({
      id: req.params.id,
    });

    res.json(updatedInventory[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update inventory with ID ${req.params.id}: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${error}`,
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
