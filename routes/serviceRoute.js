const express = require("express");
const {
  addService,
  getServices,
  updateService,
  deleteService
} = require("../controllers/servicesController");

const authMiddlware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddlware, addService);
router.get("/", authMiddlware, getServices);
router.put("/:id", authMiddlware, updateService);
router.delete("/:id", authMiddlware, deleteService);

module.exports = router;
