const ExcelJS = require("exceljs");

exports.generateSalesExcel = async (invoices, res) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Sales Report");

  // Header Row
  sheet.columns = [
    { header: "Invoice ID", key: "id", width: 25 },
    { header: "Customer Name", key: "customer", width: 25 },
    { header: "Billed By", key: "user", width: 20 },
    { header: "Date", key: "date", width: 20 },
    { header: "Total", key: "total", width: 10 },
    { header: "GST", key: "gst", width: 10 },
    { header: "Discount", key: "discount", width: 10 },
    { header: "Final Amount", key: "final", width: 15 },
    { header: "Payment Mode", key: "payment", width: 15 }
  ];

  // Add rows
  invoices.forEach((inv) => {
    sheet.addRow({
      id: inv._id.toString(),
      customer: inv.customer?.name || "N/A",
      user: inv.user?.name || "N/A",
      date: new Date(inv.createdAt).toLocaleString(),
      total: inv.totalAmount,
      gst: inv.gst,
      discount: inv.discount,
      final: inv.finalAmount,
      payment: inv.paymentMode
    });
  });

  // Set response headers
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=sales-report.xlsx");

  // Write to stream
  await workbook.xlsx.write(res);
  res.end();
};
