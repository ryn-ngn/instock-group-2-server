const knex = require("knex")(require("../knexfile"));
const router = require("express").Router();

//routes handlers
router.get("/", async (req, res) => {
  try {
    console.log("fetching warehouses from db.......");
    const data = await knex("warehouses");

    res.status(200).json(data);
  } catch (err) {
    console.log("error : " + err);
    res.status(400).send("Error while retrieving warehouses..." + err);
  }
});

module.exports = router;
