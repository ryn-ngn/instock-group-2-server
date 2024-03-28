const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");
const uniqid = require("uniqid");

//routes handlers
router
  .route("/")
  .get(inventoryController.getAllInventories)
  .post(inventoryController.postNewInventoryItem);

router.route("/:id").get(inventoryController.getItemById);

module.exports = router;
