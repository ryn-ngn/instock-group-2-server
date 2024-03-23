const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

//routes handlers
router.route("/").get(warehouseController.getAllWarehouses);

router.route("/:id").get(warehouseController.getWarehouseById);

module.exports = router;
