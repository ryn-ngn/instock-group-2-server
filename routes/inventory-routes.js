const knex = require("knex")(require("../knexfile"));
const router = require("express").Router();

//routes handlers
router.get("/", async (req, res) => {
  try {
    console.log("fetching inventories from db.......");
    const data = await knex("inventories");

    res.status(200).json(data);
  } catch (err) {
    console.log("error : " + err);
    res.status(400).send("Error while retrieving inventories..." + err);
  }
});

module.exports = router;
