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
    if (
      !item_name ||
      !description ||
      !category ||
      !status ||
      quantity === undefined ||
      !warehouse_name
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Check if quantity is a valid number
    if (isNaN(parseInt(quantity, 10))) {
      return res.status(400).json({ message: "Quantity must be a number" });
    }

    // Look up the warehouse ID based on the warehouse name
    const warehouse = await knex("warehouses")
      .where("warehouse_name", warehouse_name)
      .first();
    if (!warehouse) {
      return res.status(400).json({ message: "Warehouse name does not exist" });
    }

    // Insert new item into the database using the found warehouse ID
    const [newItemId] = await knex("inventories")
      .insert({
        item_name,
        description,
        category,
        status,
        quantity, // Already validated as a number
        warehouse_id: warehouse.id, // Use the ID from the warehouse we found above
      })
      .returning("id");

    // Retrieve and respond with the inserted item
    const insertedItem = await knex("inventories")
      .where({ id: newItemId })
      .first();
    res.status(201).json(insertedItem);
  } catch (err) {
    res.status(500).json({
      message: `Unable to create new inventory item: ${err.message}`,
    });
  }
};

module.exports = {
  getAllInventories,
  getItemById,
  postNewInventoryItem,
};
