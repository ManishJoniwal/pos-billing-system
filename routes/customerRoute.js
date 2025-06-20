const express = require("express");
const {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


// All routes protected
router.post("/", authMiddleware, addCustomer);
router.get("/", authMiddleware, getCustomers);
router.put("/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);

module.exports = router;
