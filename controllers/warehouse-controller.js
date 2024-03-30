const knex = require("knex")(require("../knexfile"));
const { isWarehouseIdValid, isValidPhoneNumberFormat } = require('../utils/helpers')
const { isWarehouseIdValid } = require('../utils/helper')

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
    const rowsDeleted = await knex("warehouses").where({ id: req.params.id });

    if (rowsDeleted.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} is not found`,
      });
    }

    await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${error}`,
    });
  }
};

//Get all inventories of a specific warehouse id (ticket 27)
const getInventoriesOfWarehouseById = async (req, res) => {
  try {
    const posts = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .where({ warehouse_id: req.params.id });

    const warehouseInventoryData = posts.map((item) => {
      const { id, item_name, category, status, quantity } = item;

      return {
        id,
        item_name,
        category,
        status,
        quantity,
      };
    });
    if (posts.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} is not found`,
      });
    } else {
      res.status(200).json(warehouseInventoryData);
    }
  } catch (error) {
    res.status(404).json({
      message: `Unable to retrieve inventories for warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

const editWarehouseById = async (req, res) => {

  const isWhIdValid = await isWarehouseIdValid(req.params.id);
  if (!isWhIdValid) {
    return res.status(404).json({
      message: `Warehouse ID not found`,
    });
  }

  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email
  } = req.body

  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email) {
    return res.status(400).json({
      message: `Missing properties in the request body`,
    })
  }

  if (!isValidPhoneNumberFormat(contact_phone)) {
    return res.status(404).json({
      message: `Phone number format and/or length not match`,
    })
  }

  try {
    await knex("warehouses")
      .where("warehouses.id", req.params.id)
      .update(req.body)
    res.status(200).json({
      id: req.params.id,
      warehouse_name: req.body.warehouse_name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      contact_name: req.body.contact_name,
      contact_position: req.body.contact_position,
      contact_phone: req.body.contact_phone,
      contact_email: req.body.contact_email
    })
  } catch (err) {
    res.status(500).json({
      message: `Unable to update warehouse with id: ${req.params.id}`,
    });
  }
}

module.exports = {
  getAllWarehouses,
  getWarehouseById,
  deleteWarehouseById,
  getInventoriesOfWarehouseById,
  editWarehouseById,
};
