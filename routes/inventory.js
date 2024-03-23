const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

//routes handlers
router.route("/").get(inventoryController.getAllInventories);

module.exports = router;
