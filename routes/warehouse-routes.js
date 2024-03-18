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
