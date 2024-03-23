const knex = require("knex")(require("../knexfile"));
const helper = require('../utils/helper')


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

//Finding an inventory item with a specific id

const getItemById = async (req, res) => {
  try {
    const itemFound = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .where("inventories.id", req.params.id);

    if (itemFound.length === 0) {
      return res.status(404).json({
        message: `Inventory item with ID ${req.params.id} not found`,
      });
    }

    const inventoryDetails = itemFound[0];
    res.status(200).json(inventoryDetails);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve inventory details: ${err.message}`,
    });
  }
};

//update inventory by ID
const editInventoryItemById = async (req, res) => {

  helper.validateInventoryUpdateRequest(req, res);

  try {
    await knex("inventories")
      .where("inventories.id", req.params.id)
      .update(req.body)
    res.status(200).json({
      id: req.params.id,
      warehouse_id: req.body.warehouse_id,
      item_name: req.body.item_name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity
    });
  } catch (err) {
    res.status(500).json({
      message: `Unable to update inventory item with id: ${req.params.id}`,
    });
  }
}

module.exports = {
  getAllInventories,
  getItemById,
  editInventoryItemById,
};
