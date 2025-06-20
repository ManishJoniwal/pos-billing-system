const express = require("express");
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
} = require("../controllers/invoiceController");

const authMiiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiiddleware, createInvoice);
router.get("/", authMiiddleware, getInvoices);
router.get("/:id", authMiiddleware, getInvoiceById);

module.exports = router;
