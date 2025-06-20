const express = require("express");
const {
  createSalon,
  getAllSalons,
  getSalonById,
  updateSalon,
  deleteSalon,
} = require("../controllers/salonController");

const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

const router = express.Router();

// All routes protected & admin only
router.post("/", authMiddleware, roleMiddleware("admin"), createSalon);
router.get("/", authMiddleware, getAllSalons);
router.get("/:id", authMiddleware, getSalonById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateSalon);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteSalon);

module.exports = router;
