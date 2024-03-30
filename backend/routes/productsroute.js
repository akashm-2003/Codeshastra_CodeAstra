const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.post("/product", productsController.addProduct);
router.get("/product", productsController.getProductsByProductId);


module.exports = router;