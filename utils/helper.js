const knex = require("knex")(require("../knexfile"));

async function isWarehouseIdValid(input) {
    const warehousesFound = await knex("warehouses").where({
        id: input,
    });
    console.log(warehousesFound.length !== 0)
    return warehousesFound.length !== 0;
}

async function isInvIdValid(input) {
    const invFound = await knex("inventories").where({
        id: input,
    });

    return invFound.length !== 0;
}

module.exports = {
    isWarehouseIdValid,
    isInvIdValid,
}