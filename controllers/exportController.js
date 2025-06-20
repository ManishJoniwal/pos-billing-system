const invoiceModel = require("../models/invoiceModel");
const { generateInvoicePDF } = require("../utils/pdfInvoiceGenerator");
const { generateSalesExcel } = require("../utils/excelReportGenerator");

exports.downloadInvoicePDF = async (req, res) => {
  try {
    const invoice = await invoiceModel.findById(req.params.id)
      .populate("customer user items");

    if (!invoice) return res.status(404).send({ message: "Invoice not found" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=invoice-${invoice._id}.pdf`);

    generateInvoicePDF(invoice, res);
  } catch (err) {
    res.status(500).send({ message: "Failed to generate PDF", error: err.message });
  }
};


exports.downloadSalesExcel = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = { salon: req.user.salon };
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const invoices = await invoiceModel.find(filter)
      .populate("customer user items")
      .sort({ createdAt: -1 });

    if (invoices.length === 0) {
      return res.status(404).send({ message: "No invoices found in given range" });
    }
    await generateSalesExcel(invoices, res);
  } catch (err) {
    res.status(500).send({ message: "Failed to generate Excel report", error: err.message });
  }
};
