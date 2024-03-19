const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving inventories: ${error}`);
  }
};

module.exports = {
  index,
};
