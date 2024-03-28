const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

//routes handlers
router.route("/").get(warehouseController.getAllWarehouses);

router
  .route("/:id")
  .get(warehouseController.getWarehouseById)
  .delete(warehouseController.deleteWarehouseById);

// Lists all inventories in a specific warehouse id
router
  .route("/:id/inventories")
  .get(warehouseController.getInventoriesOfWarehouseById);

module.exports = router;
