// Function to validate the request body for a new warehouse item
async function validateNewWarehouseItem({
  warehouse_name,
  address,
  city,
  country,
  contact_name,
  contact_position,
  contact_phone,
  contact_email,
}) {
  if (
    !warehouse_name ||
    !address ||
    !city ||
    !country ||
    !contact_name ||
    !contact_position ||
    !contact_phone ||
    !contact_email
  ) {
    return { isValid: false, message: "Missing required fields" };
  }
  // Use regex to validate that phone number is a 10 digit number
  if (!/^\d{10}$/.test(contact_phone)) {
    return {
      isValid: false,
      message: "Please enter a valid 10-digit phone number",
    };
  }

  // Use regex to validate that email has correct format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address",
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
  validateNewWarehouseItem,
  findWarehouseIdByName,
};
