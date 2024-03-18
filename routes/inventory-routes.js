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
