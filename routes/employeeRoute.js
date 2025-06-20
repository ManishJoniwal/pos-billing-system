const express = require("express");
const {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// All routes protected
router.post("/", authMiddleware, addEmployee);
router.get("/", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;
