const knex = require("knex")(require("../knexfile"));

async function isWarehouseIdValid(input) {
    const warehousesFound = await knex("warehouses").where({
        id: input,
    });
    return warehousesFound.length !== 0;
}

async function isInvIdValid(input) {
    const invFound = await knex("inventories").where({
        id: input,
    });

    return invFound.length !== 0;
}

function isValidPhoneNumberFormat(input) {
    // remove signs +/- and () from phone number string for validation purpose
    let tempPhoneNoCheck = input.replace(/[()+-\s]/g, '')
    // north american phone number format only - 10 digits
    const phoneNumberFormat = /^[0-9]{10}$/
    return phoneNumberFormat.test(tempPhoneNoCheck)
}

module.exports = {
    isWarehouseIdValid,
    isInvIdValid,
    isValidPhoneNumberFormat,
}