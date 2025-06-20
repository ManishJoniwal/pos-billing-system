const express = require("express");
const {
  getSalesSummary,
  getSalesByUser,
  getTopItems,
} = require("../controllers/analyticsController");

const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/summary", auth, getSalesSummary);
router.get("/by-user", auth, getSalesByUser);
router.get("/top-items", auth, getTopItems);

module.exports = router;
