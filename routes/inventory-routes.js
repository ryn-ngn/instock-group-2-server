// const knex = require("knex")(require("../knexfile"));
// const router = require("express").Router();

// router.get("/", async (req, res) => {
//   try {
//     console.log("fetching inventories from db.......");
//     const data = await knex("inventory");

//     res.status(200).json(data);
//   } catch (err) {
//     console.log("error : " + err);
//     res.status(400).send("Error while retrieving inventories..." + err);
//   }
// });

// module.exports = router;

const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

//routes handlers
router.route("/").get(inventoryController.index).post(inventoryController.add);

router
  .route("/:id")
  .get(inventoryController.findOne)
  .patch(inventoryController.update)
  .delete(inventoryController.remove);

router.route("/:id/warehouses").get(inventoryController.posts);

module.exports = router;
