const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById
} = require("../controllers/productController");


router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);


module.exports = router;
