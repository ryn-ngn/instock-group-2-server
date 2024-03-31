// Function to validate the request body for a new inventory item
async function validateNewItem({
  item_name,
  description,
  category,
  status,
  quantity,
  warehouse_name,
}) {
  if (
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity ||
    !warehouse_name
  ) {
    return { isValid: false, message: "Missing required fields" };
  }
  // Use regex to validate that quantity is a whole, non-negative number
  if (!/^\d+$/.test(quantity)) {
    return {
      isValid: false,
      message: "Quantity must be a whole, non-negative number",
    };
  }
  return { isValid: true };
}

// Function to look up a warehouse ID by its name
async function findWarehouseIdByName(knex, warehouse_name) {
  const warehouse = await knex("warehouses")
    .where("warehouse_name", warehouse_name)
    .first();
  return warehouse ? warehouse.id : null;
}

module.exports = {
  validateNewItem,
  findWarehouseIdByName,
};
