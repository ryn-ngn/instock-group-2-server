// const knex = require("knex")(require("../knexfile"));
// const router = require("express").Router();

// router.get("/", async (req, res) => {
//   try {
//     console.log("fetching warehouses from db.......");
//     const data = await knex("warehouse");

//     res.status(200).json(data);
//   } catch (err) {
//     console.log("error : " + err);
//     res.status(400).send("Error while retrieving warehouses..." + err);
//   }
// });

// module.exports = router;

const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

//routes handlers
router.route("/").get(warehouseController.index).post(warehouseController.add);

router
  .route("/:id")
  .get(warehouseController.findOne)
  .patch(warehouseController.update)
  .delete(warehouseController.remove);

router.route("/:id/inventories").get(warehouseController.posts);

module.exports = router;
