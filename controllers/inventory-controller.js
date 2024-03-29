const knex = require("knex")(require("../knexfile"));
const helper = require('../utils/helper')
const {
  validateNewItem,
  findWarehouseIdByName,
} = require("../utils/inventoryHelpers");


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

//GET inventory item with a specific id
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

  const isInvValid = await helper.isInvIdValid(req.params.id)
  if (!isInvValid)
    return res.status(400).json({
      message: `inventory ID is not found`,
    });

  const { warehouse_id, item_name, description, category, status, quantity } = req.body;
  if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
    return res.status(400).json({
      message: `Missing properties in the request body`,
    });
  }

  const isWhIdValid = await helper.isWarehouseIdValid(warehouse_id);
  if (!isWhIdValid) {
    return res.status(400).json({
      message: `Warehouse ID not found`,
    });
  }

  if (isNaN(quantity)) {
    return res.status(400).json({
      message: `Quantity is not a number`,
    });
  }

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

//POST a new inventory item
const postNewInventoryItem = async (req, res) => {
  try {
    const {
      item_name,
      description,
      category,
      status,
      quantity,
      warehouse_name,
    } = req.body;

    // Validate data
    const validation = await validateNewItem(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.message });
    }

    // Look up the warehouse ID based on the warehouse name
    const warehouseId = await findWarehouseIdByName(
      knex,
      req.body.warehouse_name
    );
    if (!warehouseId) {
      return res.status(400).json({ message: "Warehouse name does not exist" });
    }

    // Insert new item into the database using the found warehouse ID
    const [newItemId] = await knex("inventories").insert({
      item_name,
      description,
      category,
      status,
      quantity, // Already validated as a number
      warehouse_id: warehouseId, // Use the ID from the warehouse we found above
    });

    // Retrieve and respond with the inserted item
    const insertedItem = await knex("inventories")
      .where({ id: newItemId })
      .select(
        "id",
        "warehouse_id",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .first();
    res.status(201).json(insertedItem);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new inventory item: ${err.message}`,
    });
  }
};

const getAllItemCategories = async (req, res) => {
  try {
    const categories = await knex("inventories")
      .distinct('category')
      .pluck('category');
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json({
      message: `Unable retrieve inventory categories: ${err.message}`,
    });
  }

}
module.exports = {
  getAllInventories,
  getItemById,
  editInventoryItemById,
  postNewInventoryItem,
  getAllItemCategories
};
