const express = require("express");
const router = express.Router();
const farmersController = require("../controllers/farmersController");

router.get("/", (req, res) => {
  res.send("Hello from farmers route");
});
router.post("/farmer", farmersController.addFarmer);
router.get("/farmer", farmersController.getFarmersByPhone);
router.put("/farmer", farmersController.updateFarmer);
router.delete("/farmer", farmersController.deleteFarmer);

router.get("/order", farmersController.getAllOrders);
router.post("/order", farmersController.addOrder);
// router.put("/order", farmersController.updateOrder);
// router.delete("/order", farmersController.deleteOrder);

module.exports = router;
