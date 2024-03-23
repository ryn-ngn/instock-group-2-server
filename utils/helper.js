const knex = require("knex")(require("../knexfile"));

async function validateInventoryUpdateRequest(req, res) {
    if (!req.params.id) {
        return res.status(404).json({
            message: `Inventory item with ID ${req.params.id} not found`,
        });
    }

    // const ivnItemId = req.params.id;

    const { warehouse_id, item_name, description, category, status, quantity } = req.body;
    if (!warehouse_id || !item_name || !description || !category || !status || !quantity) {
        return res.status(400).json({
            message: `Missing properties in the request body`,
        });
    }

    const warehouseFound = await knex("warehouses").where({
        id: warehouse_id,
    });
    if (warehouseFound.length === 0) {
        return res.status(400).json({
            message: `Warehouse ID not found`,
        });
    }

    if (isNaN(quantity)) {
        return res.status(400).json({
            message: `Quantity is not a number`,
        });
    }
}

module.exports = {
    validateInventoryUpdateRequest
}