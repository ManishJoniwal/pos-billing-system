const express = require("express");
const { downloadInvoicePDF } = require("../controllers/exportController");
const { downloadSalesExcel } = require("../controllers/exportController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/invoice/:id/pdf", authMiddleware, downloadInvoicePDF);
router.get("/sales/excel", authMiddleware, downloadSalesExcel);

module.exports = router;
