const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

//routes handlers
router.route("/").get(warehouseController.getAllWarehouses);

router
  .route("/:id")
  .get(warehouseController.getWarehouseById)
  .delete(warehouseController.deleteWarehouseById);

module.exports = router;
