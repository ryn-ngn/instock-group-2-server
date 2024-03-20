const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

//routes handlers
router.route("/").get(warehouseController.index);

router.route("/:id").get(warehouseController.findOne);

module.exports = router;
