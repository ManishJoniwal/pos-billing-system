const express = require("express");
const {
  getMonthlyActiveBuyers,
  getRepeatVsNew,
  getAverageBillValue,
  getTopLoyalCustomers
} = require("../controllers/insightsController");

const authmiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/monthly-active", authmiddleware, getMonthlyActiveBuyers);
router.get("/repeat-vs-new", authmiddleware, getRepeatVsNew);
router.get("/average-bill", authmiddleware, getAverageBillValue);
router.get("/top-loyal", authmiddleware, getTopLoyalCustomers);

module.exports = router;
