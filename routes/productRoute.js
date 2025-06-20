const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const authMiddlware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddlware, addProduct);
router.get("/", authMiddlware, getProducts);
router.put("/:id", authMiddlware, updateProduct);
router.delete("/:id", authMiddlware, deleteProduct);

module.exports = router;
