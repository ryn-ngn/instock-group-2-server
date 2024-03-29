const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

//routes handlers
router
  .route("/categories")
  .get(inventoryController.getAllItemCategories)

router
  .route("/")
  .get(inventoryController.getAllInventories)
  .post(inventoryController.postNewInventoryItem);

router.route("/:id")
  .get(inventoryController.getItemById)
  .put(inventoryController.editInventoryItemById)


module.exports = router;
