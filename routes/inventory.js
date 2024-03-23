const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

//routes handlers
router.route("/").get(inventoryController.getAllInventories);

router.route("/:id")
    .get(inventoryController.getItemById)
    .put(inventoryController.editInventoryItemById)

module.exports = router;
